import React from 'react';
import { Fn } from '../types';
import { isFunction } from 'swr/_internal';

export type UseControllableProps<T = any> = {
  value?: T;
  defaultValue?: T;
  onChange?: (e: any) => void;
  valueAs?: (value: T) => any;
  changeAs?: (value: any) => T;
};

export const useControllable = <T>({
  value: valueProp,
  onChange,
  defaultValue,
  valueAs,
  changeAs,
}: UseControllableProps<T>): any => {
  const isControlled = valueProp !== undefined && valueProp !== null;
  const prevValueRef = React.useRef(valueProp);

  const [value, setValue] = React.useState(defaultValue);

  const _setValue = React.useCallback(
    (event: T | React.ChangeEvent<any> | Fn) => {
      const _value = (event as React.ChangeEvent<any>)?.target?.value ?? event;

      if (isFunction(event)) {
        setValue(event(value));
      } else {
        setValue(_value);
      }

      onChange?.(event);
    },
    [onChange, value]
  );

  const UncontrolledState = React.useMemo(() => [value, _setValue], [_setValue, value]);

  if (isControlled) {
    const _value = valueAs ? valueAs(valueProp as any) : valueProp;

    // this function is supposed to be a function to change a specific state
    const _setValue = (e: any) => {
      let _newValue = e;
      // // Parameter can be a function, so calculate the result this function
      // then store that result to var _newValue
      if (isFunction(e)) _newValue = e(prevValueRef.current);
      // make sure the child component will be updated
      setValue(_newValue);
      // Notify change to parent component
      onChange?.(changeAs ? changeAs(_newValue) : _newValue);
      // Store the data to retrieve later
      prevValueRef.current = _newValue;
    };

    return [_value, _setValue];
  }

  return UncontrolledState;
};
