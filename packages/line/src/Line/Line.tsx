import React from "react";
import "./line.scss";

export interface LineProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed";
  text?: React.ReactNode;
  align?: "center" | "left" | "right";
}

export const Line: React.FC<LineProps> = ({
  className,
  orientation = "horizontal",
  variant = "solid",
  text,
  align = "center",
}) => {
  const classes = [
    "sui-line",
    `sui-line--${orientation}`,
    `sui-line--${variant}`,
    text ? "sui-line--with-text" : "",
    text ? `sui-line--text-${align}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="separator">
      {text && <span className="sui-line__text">{text}</span>}
    </div>
  );
};

Line.displayName = "Line";