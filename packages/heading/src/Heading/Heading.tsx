import React from "react";
import "./heading.scss";

type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingWeight = "regular" | "medium" | "semibold" | "bold";

export type HeadingProps = {
  as?: HeadingAs;
  size?: HeadingSize;
  weight?: HeadingWeight;
  className?: string;
  children: React.ReactNode;
};

const defaultSizeMap: Record<HeadingAs, HeadingSize> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

export const Heading: React.FC<HeadingProps> = ({
  as: Component = "h2",
  size = "h2",
  weight = "semibold",
  className,
  children,
}) => {
  const resolvedSize: HeadingSize = size ?? defaultSizeMap[Component];

  const classes = [
    "sui-heading",
    `sui-heading--${resolvedSize}`,
    `sui-heading--${weight}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes}>{children}</Component>;
};

export default Heading;
