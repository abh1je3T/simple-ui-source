import { useContext } from "react";
import { FormFieldContext } from "../context/FormFieldContext";

export const useFormField = () => {
  const ctx = useContext(FormFieldContext);
  if (!ctx) {
    throw new Error("useFormField must be used inside FormField");
  }
  return ctx;
};

// safer version for inputs
export const useFormFieldOptional = () => {
  return useContext(FormFieldContext);
};
