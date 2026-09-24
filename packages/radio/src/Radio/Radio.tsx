import React, { forwardRef } from "react";
import clsx from "clsx";
import "./radio.scss";

export type RadioTone = "neutral" | "primary" | "success" | "warning" | "error";
export type RadioSize = "sm" | "md" | "lg";

export type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | "size"
> & {
  size?: RadioSize;
  tone?: RadioTone;
  onChange?: (checked: boolean) => void;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size = "md",
      tone = "neutral",
      className,
      onChange,
      checked,
      defaultChecked,
      disabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <span
        className={clsx(
          "sui-radio",
          `sui-radio--${size}`,
          `sui-radio--${tone}`,
          {
            "sui-radio--disabled": disabled,
          },
          className,
        )}
      >
        <input
          {...rest}
          ref={ref}
          type="radio"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />

        <span className="sui-radio__circle" />
      </span>
    );
  },
);

Radio.displayName = "Radio";

export default Radio;
