import React from "react";
import clsx from "clsx";
import "./card.scss";

import { Heading } from "@simple-ui/heading";

export type CardVariant = "elevated" | "filled" | "outline";
export type CardTone = "neutral" | "primary" | "success" | "warning" | "error";
export type HeadingSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;

  // visual
  variant?: CardVariant;
  tone?: CardTone;

  leading?: React.ReactNode; // 40x40 icon/avatar
  heading?: React.ReactNode;
  subtitle?: React.ReactNode;
  titleSize?: HeadingSize;

  // content
  media?: React.ReactNode;
  body?: React.ReactNode;

  // action
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  className,
  variant = "elevated",
  tone = "neutral",

  leading,
  heading,
  subtitle,
  titleSize = "h3",

  media,
  body,
  action,

  ...rest
}) => {
  return (
    <article
      className={clsx(
        "sui-card",
        `sui-card--${variant}`,
        `sui-card--${tone}`,
        className,
      )}
      {...rest}
    >
      {/* HEADER */}
      {(leading || heading || subtitle) && (
        <header className="sui-card__header">
          {leading && <div className="sui-card__leading">{leading}</div>}

          <div className="sui-card__header-content">
            {typeof heading === "string" ? (
              <Heading size="h6" as={titleSize} weight="semibold">
                {heading}
              </Heading>
            ) : (
              heading
            )}

            {subtitle && <p className="sui-card__subtitle">{subtitle}</p>}
          </div>
        </header>
      )}

      {/* MEDIA */}
      {media && <figure className="sui-card__media">{media}</figure>}

      {/* CONTENT WRAPPER */}
      {(body || action) && (
        <section className="sui-card__content">
          {body && <div className="sui-card__body">{body}</div>}

          {action && <footer className="sui-card__action">{action}</footer>}
        </section>
      )}
    </article>
  );
};
export default Card;
