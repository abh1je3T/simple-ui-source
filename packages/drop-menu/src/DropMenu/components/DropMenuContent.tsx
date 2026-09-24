import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDropMenuContext } from "../context/DropMenuContext";
import { DropMenuContentProps } from "../types/DropMenu.types";
import { useDropPosition } from "../hooks/useDropPosition";

export const DropMenuContent: React.FC<DropMenuContentProps> = ({ children, className }) => {
  const { open, triggerRef, contentRef } = useDropMenuContext();
  const placement = useDropPosition(triggerRef, contentRef, open);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      const trigger = triggerRef.current;
      const content = contentRef.current;

      if (!trigger || !content) return;

      const rect = trigger.getBoundingClientRect();

      const top =
        placement === "bottom"
          ? rect.bottom + window.scrollY + 6
          : rect.top + window.scrollY - content.offsetHeight - 6;

      setStyle({
        position: "absolute",
        top,
        minWidth: rect.width,
        visibility: "visible", // Ensure it's visible after positioning
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [open, placement, triggerRef, contentRef]);

  if (!open) return null;

  let itemIndex = 0;
  const itemsWithIndex = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // If it's a DropMenuItem (checked by displayName), inject the index
      if ((child.type as any).displayName === "DropMenuItem") {
        return React.cloneElement(child, {
          index: itemIndex++,
        } as any);
      }
    }
    return child;
  });

  return createPortal(
    <div
      ref={contentRef}
      className={`sui-dropmenu__content ${className || ""}`}
      style={{ ...style, position: "absolute" }}
    >
      {itemsWithIndex}
    </div>,
    document.body,
  );
};
