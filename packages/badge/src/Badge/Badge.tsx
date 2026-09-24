import React from "react";
import "./badge.scss";

export type BadgeVariant = "solid" | "subtle" | "outline";
export type BadgeSize = "sm" | "md" | "lg";

export type BadgeTone =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "neutral";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  tone?: BadgeTone;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "solid",
  size = "md",
  tone = "primary",
  icon,
  children,
  className,
}) => {
  const classes = [
    "sui-badge",
    `sui-badge--${variant}`,
    `sui-badge--${size}`,
    `sui-badge--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {icon && <span className="sui-badge__icon">{icon}</span>}
      <span className="sui-badge__text">{children}</span>
    </span>
  );
};

export default Badge;
