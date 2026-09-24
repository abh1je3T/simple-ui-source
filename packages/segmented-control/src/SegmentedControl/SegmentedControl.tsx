import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import "./segmented-control.scss";

export interface SegmentOption {
  label: string;
  value: string;
}

export type SegmentedControlSize = "sm" | "md" | "lg";
export type SegmentedControlTone =
  | "neutral"
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info";

export type SegmentedControlVariant = "subtle" | "outline";

export interface SegmentedControlProps {
  className?: string;
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  size?: SegmentedControlSize;
  tone?: SegmentedControlTone;
  variant?: SegmentedControlVariant;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  className,
  options,
  value,
  defaultValue,
  onChange,
  size = "md",
  tone = "neutral",
  variant = "subtle",
}) => {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(
    defaultValue || options[0]?.value,
  );

  const activeValue = isControlled ? value : internalValue;

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const [noTransition, setNoTransition] = useState(false);

  const activeIndex = options.findIndex((o) => o.value === activeValue);

  // hide divider at active + previous index
  const hideDividerAt = new Set([activeIndex, activeIndex - 1]);

  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) return;

    setIndicatorStyle({
      width: el.clientWidth,
      transform: `translateX(${el.offsetLeft}px)`,
    });
  }, [activeIndex, options]);

  const handleChange = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let nextIndex = activeIndex;

    if (e.key === "ArrowRight") {
      nextIndex = (activeIndex + 1) % options.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (activeIndex - 1 + options.length) % options.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = options.length - 1;
    } else {
      return;
    }

    e.preventDefault();

    setNoTransition(true);

    requestAnimationFrame(() => {
      handleChange(options[nextIndex].value);
      itemRefs.current[nextIndex]?.focus();

      // re-enable animation next frame
      requestAnimationFrame(() => {
        setNoTransition(false);
      });
    });
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={clsx(
        "sui-segmented",
        `sui-segmented--${size}`,
        `sui-segmented--${tone}`,
        `sui-segmented--${variant}`,
        className,
      )}
      onKeyDown={handleKeyDown}
    >
      <div
        className={clsx(
          "sui-segmented__indicator",
          noTransition && "no-transition",
        )}
        style={indicatorStyle}
      />

      {options.map((opt, index) => {
        const isActive = activeValue === opt.value;

        const showDivider =
          index !== options.length - 1 && !hideDividerAt.has(index);

        return (
          <React.Fragment key={opt.value}>
            <button
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={clsx("sui-segmented__item", isActive && "is-active")}
              onClick={() => handleChange(opt.value)}
            >
              {opt.label}
            </button>

            {showDivider && <span className="sui-segmented__divider" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
