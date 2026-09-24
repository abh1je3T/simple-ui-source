import React from "react";
import { FloatingPortal } from "@floating-ui/react";
import { useTooltip } from "./useTooltip";
import "./tooltip.scss";

export type TooltipSize = "sm" | "md" | "lg";
export type TooltipTone =
  | "dark"
  | "light"
  | "info"
  | "success"
  | "warning"
  | "error";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;

  size?: TooltipSize;
  tone?: TooltipTone;
  className?: string;

  delay?: number;
  placement?: "top" | "bottom" | "left" | "right";
  followCursor?: boolean;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  size = "md",
  tone = "dark",
  className,
  ...options
}) => {
  const {
    open,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    disabled,
  } = useTooltip(options);

  const referenceProps = getReferenceProps();

  if (disabled) return <>{children}</>;

  return (
    <>
      <span
        ref={refs.setReference}
        {...referenceProps}
        className="sui-tooltip-children-wrapper"
      >
        {children}
      </span>

      <FloatingPortal>
        {open && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={[
              "sui-tooltip",
              `sui-tooltip--${size}`,
              `sui-tooltip--${tone}`,
              className,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {content}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default Tooltip;
