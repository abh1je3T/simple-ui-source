import { useCallback } from "react";
import { ParsedFormat, parseValueString } from "../utils/format";

interface UseDatePasteOptions {
  setValues: (values: string[]) => void;
  focus: (index: number) => void;
  format: ParsedFormat;
  separator: string;
}

export function useDatePaste({
  setValues,
  focus,
  format,
  separator,
}: UseDatePasteOptions) {
  const handlePaste = useCallback(
    (cellIndex: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      const text = e.clipboardData.getData("text").trim();
      if (!text) return;

      // Strip any non-digit, non-separator chars then try to parse
      const next = parseValueString(
        text,
        format.segments,
        separator,
        format.totalLength,
      );

      // If the paste didn't look like a full date, try raw digits
      const hasData = next.some(Boolean);
      if (!hasData) {
        const digits = text.replace(/\D/g, "");
        const raw = Array(format.totalLength).fill("");
        for (let i = 0; i < Math.min(digits.length, format.totalLength); i++) {
          raw[i] = digits[i];
        }
        setValues(raw);
        focus(Math.min(digits.length, format.totalLength - 1));
        return;
      }

      setValues(next);
      // Focus last filled cell or first empty
      const lastFilled = next.reduce((acc, v, i) => (v ? i : acc), cellIndex);
      focus(Math.min(lastFilled + 1, format.totalLength - 1));
    },
    [setValues, focus, format, separator],
  );

  return { handlePaste };
}
