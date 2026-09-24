import React, { useState } from "react";
import clsx from "clsx";
import "./accordion.scss";

export type AccordionVariant = "filled" | "outline";
export type AccordionTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "error";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  variant?: AccordionVariant;
  tone?: AccordionTone;

  defaultOpenId?: string;
  single?: boolean;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = "outline",
  tone = "neutral",
  defaultOpenId,
  single = true,
  closeIcon,
  openIcon,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : [],
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (single) {
        return prev.includes(id) ? [] : [id];
      }
      return prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
    });
  };

  return (
    <div
      className={clsx(
        "sui-accordion",
        `sui-accordion--${variant}`,
        `sui-accordion--${tone}`,
      )}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={clsx("sui-accordion__item", {
              "is-open": isOpen,
            })}
          >
            <button
              className="sui-accordion__header"
              onClick={() => toggle(item.id)}
            >
              <span className="sui-accordion__title">{item.title}</span>

              {(openIcon || closeIcon) && (
                <span className="sui-accordion__icon">
                  <span className="sui-accordion__icon-close">{closeIcon}</span>
                  <span className="sui-accordion__icon-open">{openIcon}</span>
                </span>
              )}
            </button>

            <div className="sui-accordion__content">
              <div className="sui-accordion__inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
