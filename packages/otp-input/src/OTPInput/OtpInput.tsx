import React from "react";
import clsx from "clsx";

import { useOTPState } from "./hooks/useOTPState";
import { useOTPKeyboard } from "./hooks/useOTPKeyboard";
import { useOTPPaste } from "./hooks/useOTPPaste";

import "./otp-input.scss";
import OTPSeparator from "./ui/OTPSeparator";
import { getSeparatorIndexes } from "./utils";

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length: number;

  group?: number[];
  separator?: React.ReactNode;

  variant?: "boxed" | "underline";

  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "primary" | "success" | "warning" | "error";

  disabled?: boolean;
  autoFocus?: boolean;
  inputMode?: "numeric" | "text";
}

const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  length,
  group,
  separator,
  variant = "underline",
  size = "md",
  tone = "neutral",
  disabled = false,
  autoFocus = false,
  inputMode = "numeric",
}) => {
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  const mode = inputMode === "numeric" ? "numeric" : "text";
  const focus = (i: number) => {
    if (i < 0 || i >= length) return;
    refs.current[i]?.focus();
  };

  const { values, setValues, setAt, clearAt } = useOTPState({
    value,
    onChange,
    length,
  });

  const { handleKeyDown, handleChange } = useOTPKeyboard({
    values,
    setAt,
    clearAt,
    focus,
    length,
    mode,
  });

  const { handlePaste } = useOTPPaste({
    values,
    setValues,
    focus,
    length,
    mode,
  });

  const separatorSet = React.useMemo(
    () => new Set(getSeparatorIndexes(group, length)),
    [group, length],
  );

  return (
    <div className="sui-otp" role="group" aria-label="One-time password input">
      {Array.from({ length }).map((_, i) => (
        <React.Fragment key={i}>
          <input
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={values[i] ?? ""}
            maxLength={1}
            disabled={disabled}
            autoFocus={autoFocus && i === 0}
            inputMode={inputMode}
            autoComplete="one-time-code"
            aria-label={`OTP digit ${i + 1}`}
            onChange={(e) => handleChange(i)(e.target.value)}
            onKeyDown={handleKeyDown(i)}
            onPaste={handlePaste(i)}
            className={clsx(
              "sui-otp__input",
              `sui-otp__input--${variant}`,
              `sui-otp__input--${size}`,
              `sui-otp__input--${tone}`,
              {
                "sui-otp__input--filled": !!values[i],
                "sui-otp__input--disabled": disabled,
              },
            )}
          />

          <OTPSeparator
            index={i}
            separator={separator}
            separatorSet={separatorSet}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default OTPInput;
