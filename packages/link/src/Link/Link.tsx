import React from "react";
import "./link.scss";

export type LinkVariant = "default" | "muted" | "primary" | "danger";

export type LinkProps<C extends React.ElementType = "a"> = {
  as?: C;

  variant?: LinkVariant;
  underline?: "always" | "hover" | "none";
  disabled?: boolean;
  external?: boolean;

  children?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "children" | "className">;

export const Link = React.forwardRef(
  <C extends React.ElementType = "a">(
    {
      as,
      variant = "default",
      underline = "hover",
      disabled = false,
      external = false,
      className,
      children,
      ...props
    }: LinkProps<C>,
    ref: React.Ref<any>,
  ) => {
    const Component = as || "a";

    const classes = [
      "sui-link",
      `sui-link--${variant}`,
      `sui-link--underline-${underline}`,
      disabled && "sui-link--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const externalProps = external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    // Prevent navigation when disabled (important fix)
    const handleClick = (e: React.MouseEvent) => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    return (
      <Component
        ref={ref}
        className={classes}
        aria-disabled={disabled}
        onClick={handleClick}
        {...externalProps}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Link.displayName = "Link";
