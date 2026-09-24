import React, { forwardRef } from "react";
import clsx from "clsx";
import "./input.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix" | "onChange"
> & {
  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "primary" | "success" | "warning" | "error";

  prefix?: React.ReactNode;
  suffix?: React.ReactNode;

  onChange?: (value: string) => void; // override native
};
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder,
      disabled,
      type,
      size = "md",
      tone = "neutral",
      prefix,
      suffix,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={clsx(
          "sui-input",
          `sui-input--${size}`,
          `sui-input--${tone}`,
          {
            "sui-input--disabled": disabled,
          },
          className,
        )}
      >
        <div className="sui-input__field">
          {prefix && <span className="sui-input__prefix">{prefix}</span>}

          <input
            {...rest}
            ref={ref}
            type={type}
            className="sui-input__control"
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
          />

          {suffix && <span className="sui-input__suffix">{suffix}</span>}
        </div>
      </div>
    );
  },
);

export default Input;
