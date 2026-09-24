import React, { useId } from "react";
import "./switch.scss";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;

  disabled?: boolean;
  required?: boolean;

  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "primary" | "success" | "warning" | "error";

  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;

  label?: string;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked,
  onChange,

  disabled = false,
  required = false,

  size = "md",
  tone = "primary",

  iconOn,
  iconOff,

  label,
  className,
}) => {
  const id = useId();

  const classes = [
    "sui-switch",
    `sui-switch--${size}`,
    `sui-switch--${tone}`,
    disabled && "sui-switch--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="sui-switch__input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange?.(e.target.checked)}
      />

      <span className="sui-switch__track">
        <span className="sui-switch__thumb">
          <span className="sui-switch__icon sui-switch__icon--on">
            {iconOn}
          </span>
          <span className="sui-switch__icon sui-switch__icon--off">
            {iconOff}
          </span>
        </span>
      </span>

      {label && <span className="sui-switch__label">{label}</span>}
    </label>
  );
};

export default Switch;
