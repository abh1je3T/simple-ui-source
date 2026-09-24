import { useMemo, useRef } from "react";

type UseOTPProps = {
  value: string;
  onChange: (value: string) => void;
  length: number;
};

export function useOTP({ value, onChange, length }: UseOTPProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const values = useMemo(() => {
    const arr = value ? value.split("") : [];
    return Array.from({ length }, (_, i) => arr[i] || "");
  }, [value, length]);

  const setValue = (vals: string[]) => {
    onChange(vals.join("").slice(0, length));
  };

  const focus = (i: number) => {
    refs.current[i]?.focus();
  };

  return {
    refs,
    values,
    setValue,
    focus,
  };
}
