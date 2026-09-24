import React from "react";
import clsx from "clsx";
import { useFormField } from "../hooks/useFormField";

export interface FormFieldMessageProps {
  children?: React.ReactNode;
  className?: string;
}

const FormFieldMessage: React.FC<FormFieldMessageProps> = ({
  children,
  className,
}) => {
  const { messageId, error } = useFormField();

  if (!children && !error) return null;

  return (
    <div
      id={messageId}
      className={clsx("sui-form-field__message", className, {
        "sui-form-field__message--error": !!error,
      })}
    >
      {children}
    </div>
  );
};

export default FormFieldMessage;