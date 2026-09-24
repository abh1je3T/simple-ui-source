import React, { useState } from "react";
import { useTransitionState } from "./hooks/useTransitionState";
import "./alert.scss";
import CloseIcon from "./CloseIcon";

export type AlertTone =
  | "neutral"
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info";

export type AlertVariant = "subtle" | "solid";
export type AlertSize = "sm" | "md" | "lg";

export interface AlertProps {
  className?: string;

  tone?: AlertTone;
  variant?: AlertVariant;
  size?: AlertSize;

  title?: React.ReactNode;
  children?: React.ReactNode;

  dismissible?: boolean;
  onDismiss?: () => void;

  icon?: React.ReactNode;

  open?: boolean;
  defaultOpen?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  className,
  tone = "neutral",
  variant = "subtle",
  size = "md",
  title,
  children,
  dismissible,
  onDismiss,
  icon,
  open,
  defaultOpen = true,
}) => {
  const isControlled = open !== undefined;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const actualOpen = isControlled ? open! : internalOpen;

  const { mounted, phase } = useTransitionState({
    open: actualOpen,
    duration: 200,
  });

  if (!mounted) return null;

  const handleClose = () => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onDismiss?.();
  };

  const classes = [
    "sui-alert",
    `sui-alert--${tone}`,
    `sui-alert--${variant}`,
    `sui-alert--${size}`,
    `sui-alert--${phase}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="alert">
      {icon && <div className="sui-alert__icon">{icon}</div>}

      <div className="sui-alert__content">
        {title && <div className="sui-alert__title">{title}</div>}
        {children && <div className="sui-alert__description">{children}</div>}
      </div>

      {dismissible && (
        <button
          className="sui-alert__close"
          onClick={handleClose}
          aria-label="Close alert"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Alert;
