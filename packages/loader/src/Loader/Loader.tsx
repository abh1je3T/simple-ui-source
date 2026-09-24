import React from "react";
import "./loader.scss";

export type LoaderVariant = "spinner" | "dots" | "glow" | "bars";
export type LoaderSize = "sm" | "md" | "lg";
export type LoaderTone = "primary" | "secondary" | "neutral";

export interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  tone?: LoaderTone;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  variant = "spinner",
  size = "md",
  tone = "primary",
  className,
}) => {
  const classes = [
    "sui-loader",
    `sui-loader--${variant}`,
    `sui-loader--${size}`,
    `sui-loader--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} role="status" aria-label="Loading">
      <span className="sui-loader__inner" />
    </span>
  );
};

export default Loader;
