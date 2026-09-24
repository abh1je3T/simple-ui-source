import React from "react";
import clsx from "clsx";

import "./card-skeleton.scss";

import type { CardTone, CardVariant } from "./Card";

export interface CardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;

  variant?: CardVariant;
  tone?: CardTone;

  showLeading?: boolean;
  showMedia?: boolean;
  lines?: number;
  showAction?: boolean;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  variant = "elevated",
  tone = "neutral",

  showLeading = true,
  showMedia = false,
  lines = 3,
  showAction = true,

  ...rest
}) => {
  return (
    <article
      className={clsx(
        "sui-card",
        "sui-card-skeleton",
        `sui-card--${variant}`,
        `sui-card--${tone}`,
        className,
      )}
      aria-busy="true"
      aria-label="Loading content"
      {...rest}
    >
      {/* HEADER */}
      <header className="sui-card__header">
        {showLeading && (
          <div className="sui-card-skeleton__avatar sui-skeleton" />
        )}

        <div className="sui-card__header-content">
          <div className="sui-card-skeleton__title sui-skeleton" />

          <div className="sui-card-skeleton__subtitle sui-skeleton" />
        </div>
      </header>

      {/* MEDIA */}
      {showMedia && <div className="sui-card-skeleton__media sui-skeleton" />}

      {/* BODY */}
      <section className="sui-card__content">
        <div className="sui-card__body">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={clsx("sui-card-skeleton__line", "sui-skeleton", {
                "sui-card-skeleton__line--short": index === lines - 1,
              })}
            />
          ))}
        </div>

        {/* ACTION */}
        {showAction && (
          <footer className="sui-card__action">
            <div className="sui-card-skeleton__button sui-skeleton" />
          </footer>
        )}
      </section>
    </article>
  );
};

export default CardSkeleton;
