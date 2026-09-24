import { useState, useEffect, useCallback } from "react";
import {
  ParsedFormat,
  parseValueString,
  serialiseValues,
} from "../utils/format";

interface UseDateStateOptions {
  value?: string; // controlled
  defaultValue?: string; // uncontrolled
  onChange?: (value: string) => void;
  format: ParsedFormat;
  separator: string;
}

export function useDateState({
  value,
  defaultValue,
  onChange,
  format,
  separator,
}: UseDateStateOptions) {
  const isControlled = value !== undefined;

  const parse = useCallback(
    (v?: string) =>
      parseValueString(v ?? "", format.segments, separator, format.totalLength),
    [format, separator],
  );

  const [internalValues, setInternalValues] = useState<string[]>(() =>
    parse(defaultValue),
  );

  // Sync when controlled value changes externally
  useEffect(() => {
    if (isControlled) {
      setInternalValues(parse(value));
    }
  }, [isControlled, value, parse]);

  const values = isControlled ? parse(value) : internalValues;

  const commit = useCallback(
    (next: string[]) => {
      if (!isControlled) setInternalValues(next);
      const serialised = serialiseValues(next, format.segments, separator);
      onChange?.(serialised);
    },
    [isControlled, format, separator, onChange],
  );

  const setAt = useCallback(
    (index: number, char: string) => {
      const next = [...values];
      next[index] = char;
      commit(next);
    },
    [values, commit],
  );

  const clearAt = useCallback(
    (index: number) => {
      const next = [...values];
      next[index] = "";
      commit(next);
    },
    [values, commit],
  );

  const setValues = useCallback(
    (next: string[]) => {
      commit(next);
    },
    [commit],
  );

  return { values, setAt, clearAt, setValues };
}
