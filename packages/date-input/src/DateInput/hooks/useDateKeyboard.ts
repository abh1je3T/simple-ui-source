import { useCallback } from "react";
import { ParsedFormat, getCellSegment } from "../utils/format";
import {
  isDigitValid,
  shouldAutoAdvanceAfterFirstDigit,
} from "../utils/validate";

interface UseDateKeyboardOptions {
  values: string[];
  setAt: (index: number, char: string) => void;
  clearAt: (index: number) => void;
  focus: (index: number) => void;
  format: ParsedFormat;
}

export function useDateKeyboard({
  values,
  setAt,
  clearAt,
  focus,
  format,
}: UseDateKeyboardOptions) {
  const handleKeyDown = useCallback(
    (cellIndex: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;
      const info = getCellSegment(cellIndex, format.segments);
      if (!info) return;

      const { meta, posInSegment } = info;
      const segmentValues = values.slice(
        meta.cellStart,
        meta.cellStart + meta.length,
      );

      // Digit input
      if (/^\d$/.test(key)) {
        e.preventDefault();

        if (!isDigitValid(key, meta.segment, posInSegment, segmentValues)) {
          return;
        }

        setAt(cellIndex, key);

        const isLastInSegment = posInSegment === meta.length - 1;
        const autoAdvance =
          posInSegment === 0 &&
          shouldAutoAdvanceAfterFirstDigit(key, meta.segment);

        if (isLastInSegment || autoAdvance) {
          focus(cellIndex + 1);
        } else {
          focus(cellIndex + 1);
        }
        return;
      }

      // Backspace
      if (key === "Backspace") {
        e.preventDefault();
        if (values[cellIndex]) {
          clearAt(cellIndex);
        } else {
          focus(cellIndex - 1);
        }
        return;
      }

      // Delete
      if (key === "Delete") {
        e.preventDefault();
        clearAt(cellIndex);
        return;
      }

      // Arrow navigation
      if (key === "ArrowLeft") {
        e.preventDefault();
        focus(cellIndex - 1);
        return;
      }

      if (key === "ArrowRight") {
        e.preventDefault();
        focus(cellIndex + 1);
        return;
      }

      // Tab — let browser handle naturally
    },
    [values, setAt, clearAt, focus, format],
  );

  // onChange fires when the input value changes (e.g. mobile input)
  const handleChange = useCallback(
    (cellIndex: number) => (inputValue: string) => {
      // Only take the last character typed (maxLength=1 but some IMEs still fire)
      const char = inputValue.slice(-1);
      if (!char) return;

      const info = getCellSegment(cellIndex, format.segments);
      if (!info) return;

      const { meta, posInSegment } = info;
      const segmentValues = values.slice(
        meta.cellStart,
        meta.cellStart + meta.length,
      );

      if (!isDigitValid(char, meta.segment, posInSegment, segmentValues)) {
        return;
      }

      setAt(cellIndex, char);

      const autoAdvance =
        posInSegment === 0 &&
        shouldAutoAdvanceAfterFirstDigit(char, meta.segment);
      const isLastInSegment = posInSegment === meta.length - 1;

      if (isLastInSegment || autoAdvance) {
        focus(cellIndex + 1);
      } else {
        focus(cellIndex + 1);
      }
    },
    [values, setAt, focus, format],
  );

  return { handleKeyDown, handleChange };
}
