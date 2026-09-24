import React, { useMemo } from "react";
import "./progress.scss";

export type ProgressProps = {
  value?: number;
  defaultValue?: number;
  max?: number;
  buffer?: number;

  appearance?: "solid" | "dotted";

  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "primary" | "success" | "warning" | "error";

  mode?: "determinate" | "indeterminate";

  pattern?: "continuous" | "steps";
  steps?: number;

  showValue?: boolean;

  className?: string;
};

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const Progress: React.FC<ProgressProps> = ({
  value,
  defaultValue = 0,
  max = 100,
  buffer,

  appearance = "solid",

  size = "md",
  tone = "primary",

  mode = "determinate",

  pattern = "continuous",
  steps = 5,

  showValue = false,

  className,
}) => {
  const rawValue = value ?? defaultValue;
  const safeValue = useMemo(() => clamp(rawValue, 0, max), [rawValue, max]);

  const percentage = useMemo(() => {
    if (max <= 0) return 0;
    return (safeValue / max) * 100;
  }, [safeValue, max]);

  const stepsArray = useMemo(() => {
    if (pattern !== "steps") return [];

    const stepSize = max / steps;

    return Array.from(
      { length: steps },
      (_, i) => safeValue >= stepSize * (i + 1),
    );
  }, [pattern, steps, safeValue, max]);

  const classes = useMemo(
    () =>
      [
        "sui-progress",
        `sui-progress--${size}`,
        `sui-progress--${tone}`,
        `sui-progress--${appearance}`,
        `sui-progress--${mode}`,
        pattern === "steps" && "sui-progress--steps",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [size, tone, appearance, mode, pattern, className],
  );

  const renderLinear = () => {
    const safeBuffer = buffer !== undefined ? clamp(buffer, 0, max) : undefined;

    const bufferPercentage =
      safeBuffer !== undefined ? (safeBuffer / max) * 100 : 0;

    return (
      <div className="sui-progress__track">
        <div className="sui-progress__bar">
          {buffer !== undefined && (
            <div
              className="sui-progress__bar-buffer"
              style={{ width: `${bufferPercentage}%` }}
            />
          )}
          <div
            className="sui-progress__bar-fill"
            style={
              mode === "determinate" ? { width: `${percentage}%` } : undefined
            }
          />
          {appearance === "dotted" && (
            <div className="sui-progress__bar-dots" />
          )}
        </div>
      </div>
    );
  };

  const renderSteps = () => (
    <div className="sui-progress__steps">
      {stepsArray.map((filled, i) => (
        <div
          key={i}
          className={`sui-progress__step ${filled ? "is-filled" : ""}`}
        />
      ))}
    </div>
  );

  return (
    <div className={classes}>
      {pattern === "continuous" && renderLinear()}
      {pattern === "steps" && renderSteps()}

      {showValue && mode === "determinate" && pattern !== "steps" && (
        <span className="sui-progress__label">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};

export default Progress;
