import React from "react";
import { sanitizeOTP } from "../utils";

type OTPMode = "numeric" | "text";

type UseOTPKeyboardProps = {
  values: string[];
  setAt: (index: number, char: string) => void;
  clearAt: (index: number) => void;
  focus: (index: number) => void;
  length: number;
  mode: OTPMode; // 👈 ADD THIS
};

export function useOTPKeyboard({
  values,
  setAt,
  clearAt,
  focus,
  length,
  mode,
}: UseOTPKeyboardProps) {
  const handleKeyDown =
    (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Backspace": {
          e.preventDefault();

          if (values[index]) {
            clearAt(index);
          } else if (index > 0) {
            focus(index - 1);
            clearAt(index - 1);
          }
          break;
        }

        case "ArrowLeft":
          e.preventDefault();
          if (index > 0) focus(index - 1);
          break;

        case "ArrowRight":
          e.preventDefault();
          if (index < length - 1) focus(index + 1);
          break;
      }
    };

  const handleChange = (index: number) => (val: string) => {
    const cleaned = sanitizeOTP(val, mode);
    const char = cleaned.slice(-1);

    if (!char) return;

    setAt(index, char);

    if (index < length - 1) {
      focus(index + 1);
    }
  };

  return {
    handleKeyDown,
    handleChange,
  };
}
