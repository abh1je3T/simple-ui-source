import React, { useId, useMemo } from "react";
import clsx from "clsx";
import "./form-field.scss";

import { FormFieldContext } from "./context/FormFieldContext";
import FormFieldLabel from "./ui/FormFieldLabel";
import FormFieldMessage from "./ui/FormFieldMessage";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  className,
  children,
  ...rest
}) => {
  const id = useId();

  const labelId = `${id}-label`;
  const messageId = `${id}-message`;

  const hasError = !!error;

  const contextValue = useMemo(
    () => ({
      id,
      labelId,
      messageId,
      error,
      helperText,
      required,
    }),
    [id, error, helperText, required],
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div
        className={clsx("sui-form-field", className, {
          "sui-form-field--error": hasError,
        })}
        {...rest}
      >
        {label && (
          <FormFieldLabel required={required} id={labelId}>
            {label}
          </FormFieldLabel>
        )}

        <div className="sui-form-field__control">{children}</div>

        {(error || helperText) && (
          <FormFieldMessage>{error || helperText}</FormFieldMessage>
        )}
      </div>
    </FormFieldContext.Provider>
  );
};

export default FormField;
