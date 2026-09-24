import React, { forwardRef, useEffect, useRef } from "react";
import clsx from "clsx";
import "./checkbox.scss";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | "size"
> & {
  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "primary" | "success" | "warning" | "error";

  indeterminate?: boolean;

  onChange?: (checked: boolean) => void;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      tone = "neutral",
      indeterminate = false,
      className,
      onChange,
      checked,
      defaultChecked,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);

    const setRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.RefObject<HTMLInputElement | null>).current = node;
      }
    };

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <span
        className={clsx(
          "sui-checkbox",
          `sui-checkbox--${size}`,
          `sui-checkbox--${tone}`,
          {
            "sui-checkbox--disabled": disabled,
            "sui-checkbox--indeterminate": indeterminate,
          },
          className,
        )}
      >
        <input
          {...rest}
          ref={setRef}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />

        <span className="sui-checkbox__box" />
      </span>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
