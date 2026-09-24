import React, { useEffect, useState } from "react";
import "./avatar.scss";

type AvatarTone = "neutral" | "primary" | "success" | "warning" | "error";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  icon?: string | React.ReactNode;

  size?: "sm" | "md" | "lg";
  shape?: "circle" | "square";

  tone?: AvatarTone;

  clickable?: boolean;

  showStatus?: boolean;
  status?: "online" | "away" | "busy";

  badge?: React.ReactNode;
}

const getInitials = (name?: string) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
  name,
  icon,
  size = "md",
  shape = "circle",
  tone = "neutral",
  clickable = false,
  showStatus = false,
  status = "online",
  badge,
  className,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const isImage = typeof icon === "string";
  const initials = getInitials(name);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [icon]);

  return (
    <div
      className={[
        "sui-avatar",
        `sui-avatar--${size}`,
        `sui-avatar--${shape}`,
        `sui-avatar--tone-${tone}`,
        clickable ? "sui-avatar--clickable" : "",
        className || "",
      ]
        .join(" ")
        .trim()}
      role="img"
      aria-label={name}
      {...rest}
    >
      {/* ================= CORE (clipped area) ================= */}
      <div className="sui-avatar__core">
        {isImage && !error && (
          <img
            src={icon as string}
            alt={name || "avatar"}
            className={`sui-avatar-img ${loaded ? "is-loaded" : ""}`}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setError(true);
              setLoaded(true);
            }}
          />
        )}

        {(!isImage || error || !loaded) && (
          <div className="sui-avatar-content">
            {!isImage && icon ? icon : initials}
          </div>
        )}
      </div>

      {/* ================= OVERLAY (NOT clipped) ================= */}
      <div className="sui-avatar__overlay">
        {badge ? (
          <div className="sui-avatar-badge">{badge}</div>
        ) : (
          showStatus && (
            <span
              className={`sui-avatar-status sui-avatar-status--${status}`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Avatar;
