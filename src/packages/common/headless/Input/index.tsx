import classNames from 'classnames';
import { HTMLInputProps } from '@/common/types/htmlElements';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useControllable } from '@/common/hooks/useControllable';

type InputType = 'email' | 'file' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'time';

export type BaseInputProps = Omit<HTMLInputProps, 'ref' | 'type'> & {
  ref?: React.Ref<HTMLInputElement>;
};

export type InputProps = BaseInputProps & {
  label?: React.ReactNode;
  type?: InputType;
  className?: string;
  classNameInput?: string;
  error?: boolean;
};

export const Input = forwardRef(
  (
    {
      label,
      className = '',
      classNameInput = 'px-4 py-2',
      type,
      onChange: onChangeProp,
      defaultValue,
      placeholder,
      value: valueProp,
      error,
      ...props
    }: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useControllable({
      value: valueProp,
      onChange: onChangeProp,
      defaultValue,
    });
    const { name } = props;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      },
      [setValue]
    );

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const borderClassNames = classNames('border border-input border-solid transition-all', {
      '!border-red-500': error,
    });
    return (
      <div className={className}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type={type}
          autoComplete={name}
          className={classNames(
            'appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm',
            classNameInput,
            borderClassNames
          )}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
