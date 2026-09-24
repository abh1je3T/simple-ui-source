import { useMemo } from "react";

type UseOTPStateProps = {
  value: string;
  onChange: (value: string) => void;
  length: number;
};

export function useOTPState({ value, onChange, length }: UseOTPStateProps) {
  const values = useMemo(() => {
    const arr = value ? value.split("") : [];
    return Array.from({ length }, (_, i) => arr[i] || "");
  }, [value, length]);

  const setValues = (next: string[]) => {
    onChange(next.join("").slice(0, length));
  };

  const setAt = (index: number, char: string) => {
    const next = [...values];
    next[index] = char;
    setValues(next);
  };

  const clearAt = (index: number) => {
    const next = [...values];
    next[index] = "";
    setValues(next);
  };

  return {
    values,
    setValues,
    setAt,
    clearAt,
  };
}
