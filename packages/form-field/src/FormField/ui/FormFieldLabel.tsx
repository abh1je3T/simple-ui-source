import React from "react";
import { useFormFieldOptional } from "../hooks/useFormField";
import { Label, LabelProps } from "@simple-ui/label";

export interface FormFieldLabelProps extends LabelProps {
  required?: boolean;
}

const FormFieldLabel: React.FC<FormFieldLabelProps> = ({
  required,
  children,
  ...props
}) => {
  const field = useFormFieldOptional();

  return (
    <Label
      {...props}
      htmlFor={field?.id}
      required={required || field?.required}
    >
      {children}
    </Label>
  );
};

export default FormFieldLabel;
