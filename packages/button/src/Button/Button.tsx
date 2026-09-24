import React from "react";
import "./Button.scss"; // Assuming you have a CSS file for button styling

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "link"
  | "success"
  | "warning"
  | "error"
  | "info";

type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ...props
}) => {
  const isIconOnly = icon && !children;
  const classes = [
    "btn",
    variant && `btn-${variant}`,
    size && `btn-${size}`,
    isIconOnly && "btn-icon",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {!isIconOnly && children}
      {icon && <span className="btn-icon-element">{icon}</span>}
    </button>
  );
};
export default Button;
