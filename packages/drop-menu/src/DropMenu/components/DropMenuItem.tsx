import React, { useRef, useEffect } from "react";
import { useDropMenuContext } from "../context/DropMenuContext";
import { DropMenuItemProps } from "../types/DropMenu.types";

export interface DropMenuItemExtendedProps extends DropMenuItemProps {
  index?: number;
}

export const DropMenuItem: React.FC<DropMenuItemExtendedProps> = ({
  children,
  disabled,
  onClick,
  className,
  index,
}) => {
  const { setOpen, registerItem, activeIndex } = useDropMenuContext();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (index !== undefined) {
      registerItem(ref.current, index);
      return () => registerItem(null, index);
    }
  }, [index, registerItem]);

  useEffect(() => {
    if (activeIndex === index && ref.current) {
      ref.current.scrollIntoView({
        block: "nearest",
      });
      ref.current.focus();
    }
  }, [activeIndex, index]);

  return (
    <div
      ref={ref}
      className={[
        "sui-dropmenu__item",
        disabled ? "is-disabled" : "",
        activeIndex === index ? "is-active" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={(e) => {
        if (disabled) return;
        onClick?.(e);
        setOpen(false);
      }}
    >
      {children}
    </div>
  );
};

DropMenuItem.displayName = "DropMenuItem";

export default DropMenuItem;
