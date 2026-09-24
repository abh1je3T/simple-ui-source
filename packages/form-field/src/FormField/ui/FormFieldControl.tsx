import React, { cloneElement, isValidElement } from "react";
import { useFormField } from "../hooks/useFormField";

type Props = {
  children: React.ReactNode;
};

const FormFieldControl: React.FC<Props> = ({ children }) => {
  const field = useFormField();

  if (!isValidElement(children)) return <>{children}</>;

  return cloneElement(children as React.ReactElement<any>, {
    id: field.id,
    "aria-describedby": field.messageId,
    "aria-invalid": !!field.error || undefined,
    disabled: field.disabled,
  });
};

export default FormFieldControl;