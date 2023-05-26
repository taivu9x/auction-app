import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Field, FieldProps } from './Field';
import { Input, InputProps } from '../Input';
import { HTMLDivProps } from '@/common/types/htmlElements';
import { ErrorMessage } from './ErrorMessage';
import classNames from 'classnames';

export type Props<T extends FieldValues> = Omit<
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'onSubmit'
> & {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<T>;
  methods: UseFormReturn<T>;
};

export const Form = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  methods,
  ...props
}: Props<TFieldValues>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

const FormInput = (props: FieldProps & Omit<InputProps, keyof FieldProps>) => (
  <Field {...props} component={Input} />
);

const FormErrorMessage = ({ name, className, ...restProps }: HTMLDivProps & { name: string }) => (
  <ErrorMessage name={name}>
    {message =>
      message ? (
        <p
          className={classNames('text-red-500', 'flex-1 whitespace-pre-line', className)}
          {...restProps}>
          {message}
        </p>
      ) : null
    }
  </ErrorMessage>
);

Form.Input = FormInput;
Form.ErrorMessage = FormErrorMessage;
