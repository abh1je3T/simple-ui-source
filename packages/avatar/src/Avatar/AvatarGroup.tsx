import React from "react";
import "./avatar-group.scss";

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;

  size?: "sm" | "md" | "lg";
  spacing?: "tight" | "normal";

  stacked?: "left" | "right"; // Slack vs Teams feel
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 4,
  size = "md",
  spacing = "normal",
  stacked = "left",
}) => {
  const items = React.Children.toArray(children);

  const visible = stacked === "right" ? items.slice(-max) : items.slice(0, max);

  const remaining = items.length - visible.length;

  return (
    <div
      className={[
        "sui-avatar-group",
        `sui-avatar-group--${size}`,
        `sui-avatar-group--${spacing}`,
        `sui-avatar-group--${stacked}`,
      ]
        .join(" ")
        .trim()}
    >
      {visible.map((child, i) => (
        <div key={i} className="sui-avatar-group-item">
          {child}
        </div>
      ))}

      {remaining > 0 && (
        <div className="sui-avatar-group-item">
          <div
            className={[
              "sui-avatar",
              `sui-avatar--${size}`,
              "sui-avatar--circle",
              "sui-avatar--tone-neutral",
            ].join(" ")}
          >
            +{remaining}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
