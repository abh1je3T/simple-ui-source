import React from "react";
import "./label.scss";

export type LabelSize = "sm" | "md" | "lg";
export type LabelWeight = "regular" | "medium" | "semibold" | "bold";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: LabelSize;
  weight?: LabelWeight;
  required?: boolean;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({
  size = "md",
  weight = "medium",
  required = false,
  className,
  children,
  ...props
}) => {
  const classes = [
    "sui-label",
    `sui-label--${size}`,
    `sui-label--${weight}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} {...props}>
      {children}
      {required && <span className="sui-label__required">*</span>}
    </label>
  );
};

export default Label;
