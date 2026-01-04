import clsx from 'clsx';
import React from 'react';
import { useField } from 'remix-validated-form';
import FormElement from './FormElement';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'placeholder'
> & {
  label?: string;
  name: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, required, ...props }, ref) => {
    const { error, getInputProps } = useField(name);

    return (
      <FormElement name={name} label={label} required={required}>
        <input
          ref={ref}
          {...props}
          {...getInputProps()}
          className={clsx(
            'block w-full py-2 px-4 shadow-sm border bg-[hsl(var(--card))] rounded-md text-base sm:text-sm text-[hsl(var(--foreground))]  border-foreground placeholder-lead-text',
            'focus:ring-primary-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:placeholder-lead-text',
            {
              'border-rose-500 focus:border-rose-500': error,
            },
            props.className,
          )}
        >
          {props.children}
        </input>
      </FormElement>
    );
  },
);
