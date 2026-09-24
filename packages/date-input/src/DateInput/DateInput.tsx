import React, { useCallback, useMemo, useRef } from "react";
import clsx from "clsx";

import {
  DateSegment,
  parseFormat,
  getCellSegment,
  serialiseValues,
} from "./utils/format";
import { useDateState } from "./hooks/useDateState";
import { useDateKeyboard } from "./hooks/useDateKeyboard";
import { useDatePaste } from "./hooks/useDatePaste";

import "./date-input.scss";

export interface DateInputProps {
  format?: DateSegment[];

  /**
   * Sets the hidden input's id/name for form submission.
   * The full date value (e.g. "25/06/2025") is submitted under this name.
   * For <label>, point htmlFor at "{id}-input" to focus the first cell.
   */
  id?: string;
  name?: string;

  // Controlled
  value?: string;
  // Uncontrolled
  defaultValue?: string;

  onChange?: (value: string) => void;

  separator?: string;

  variant?: "boxed" | "underline";
  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "primary" | "success" | "warning" | "error";

  disabled?: boolean;
  autoFocus?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  format: formatProp = ["DD", "MM", "YYYY"],
  id,
  name,
  value,
  defaultValue,
  onChange,
  separator = "/",
  variant = "underline",
  size = "md",
  tone = "neutral",
  disabled = false,
  autoFocus = false,
}) => {
  const parsedFormat = useMemo(
    () => parseFormat(formatProp),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formatProp.join(",")],
  );

  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const focus = useCallback(
    (i: number) => {
      if (i < 0 || i >= parsedFormat.totalLength) return;
      refs.current[i]?.focus();
    },
    [parsedFormat.totalLength],
  );

  const { values, setAt, clearAt, setValues } = useDateState({
    value,
    defaultValue,
    onChange,
    format: parsedFormat,
    separator,
  });

  const { handleKeyDown, handleChange } = useDateKeyboard({
    values,
    setAt,
    clearAt,
    focus,
    format: parsedFormat,
  });

  const { handlePaste } = useDatePaste({
    setValues,
    focus,
    format: parsedFormat,
    separator,
  });

  const separatorAfter = useMemo(() => {
    const set = new Set<number>();
    parsedFormat.segments.forEach((seg, i) => {
      if (i < parsedFormat.segments.length - 1) {
        set.add(seg.cellStart + seg.length - 1);
      }
    });
    return set;
  }, [parsedFormat]);

  const hiddenValue = serialiseValues(values, parsedFormat.segments, separator);

  return (
    <div
      className={clsx("sui-date-input", `sui-date-input--${size}`, {
        "sui-date-input--disabled": disabled,
      })}
      role="group"
      aria-label="Date input"
    >
      {/* Hidden input — carries the full serialised value for form submission */}
      {(id || name) && (
        <input type="hidden" id={id} name={name} value={hiddenValue} />
      )}

      {Array.from({ length: parsedFormat.totalLength }).map((_, i) => {
        const info = getCellSegment(i, parsedFormat.segments);
        const placeholderChar = info
          ? info.meta.segment[info.posInSegment]
          : "_";

        // First cell gets a labelable id so <label htmlFor="{id}-input"> works
        const cellId = id && i === 0 ? `${id}-input` : undefined;

        return (
          <React.Fragment key={i}>
            <input
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={cellId}
              value={values[i] ?? ""}
              maxLength={1}
              disabled={disabled}
              autoFocus={autoFocus && i === 0}
              inputMode="numeric"
              autoComplete="off"
              aria-label={`${info?.meta.segment ?? ""} digit ${(info?.posInSegment ?? 0) + 1}`}
              placeholder={placeholderChar}
              onChange={(e) => handleChange(i)(e.target.value)}
              onKeyDown={handleKeyDown(i)}
              onPaste={handlePaste(i)}
              className={clsx(
                "sui-date-input__cell",
                `sui-date-input__cell--${variant}`,
                `sui-date-input__cell--${size}`,
                `sui-date-input__cell--${tone}`,
                {
                  "sui-date-input__cell--wide": info?.meta.segment === "YYYY",
                  "sui-date-input__cell--filled": !!values[i],
                  "sui-date-input__cell--disabled": disabled,
                },
              )}
            />

            {separatorAfter.has(i) && (
              <span className="sui-date-input__separator" aria-hidden="true">
                {separator}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DateInput;
export type { DateSegment };
