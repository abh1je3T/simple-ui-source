import { createContext } from "react";

export interface FormFieldContextType {
  id: string;
  labelId: string;
  messageId: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FormFieldContext = createContext<FormFieldContextType | null>(
  null,
);
