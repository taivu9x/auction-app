import { RefObject, useCallback, useEffect } from 'react';
import { RegisterOptions, get, useController, useFormContext } from 'react-hook-form';

export type Props<T = any> = {
  rules?: RegisterOptions;
  name: string;
  errorGroup?: string[];
  className?: string;
  onBlur?: (e: any) => void;
  value?: any;
  onChange?: (e: any) => void;
  emptyValue?: any;
  componentType?: 'checkbox' | 'radio' | 'common' | 'select';
  component: React.ComponentType<T>;
  inputRef?: RefObject<any> | React.Ref<any>;
  valueAs?: (value: any) => any;
  changeAs?: (value: any) => any;
};

export type FieldProps = Omit<Props, 'component'>;

export const Field = <T,>({
  component,
  name,
  rules,
  onBlur: onBlurProp,
  className,
  value: valueProp,
  errorGroup = [],
  emptyValue = '',
  inputRef,
  onChange: onChangeProp,
  valueAs = (value: any) => value,
  changeAs = (value: any) => value,
  componentType,
  ...restProps
}: Props<T>) => {
  const Component = component;
  const {
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    setError,
  } = useFormContext();

  const {
    field: { onChange, onBlur, value, ref: fieldRef, ...restField },
  } = useController({ name, rules });

  useEffect(() => {
    if (emptyValue && !value) {
      setValue(name, emptyValue, { shouldDirty: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const error = get(errors, name);
  const errorMessage = error?.message;
  const hasGroupError = errorGroup.reduce(
    (acc, cur) => !!acc && !!get(errors, cur)?.message,
    false
  );

  const hasError = !!error || hasGroupError;

  const values = errorGroup.map(name => getValues(name));

  useEffect(() => {
    if (hasGroupError) {
      errorGroup.forEach(name => clearErrors(name));
    } else {
      errorGroup.forEach(name => setError(name, { message: errorMessage as string }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors, errorMessage, setError, ...errorGroup, ...values]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const _value = e.target?.value ?? (e as any) ?? emptyValue;
    onChange(changeAs(_value));
    onChangeProp?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    onBlur();
    onBlurProp?.(e);
  };

  const resolveValue = useCallback(
    () => {
      if ([null, undefined].includes(value)) return emptyValue;

      if (valueAs) return valueAs(value);

      return value;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(emptyValue), JSON.stringify(value), valueAs]
    /* eslint-enable react-hooks/exhaustive-deps */
  );

  return (
    <Component
      onChange={handleChange}
      onBlur={handleBlur}
      error={hasError || (undefined as any)}
      className={className}
      value={resolveValue()}
      ref={inputRef ?? fieldRef}
      {...restField}
      {...(restProps as any)}
    />
  );
};
