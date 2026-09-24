import React from "react";
import { useDropMenuContext } from "../context/DropMenuContext";
import { DropMenuTriggerProps } from "../types/DropMenu.types";

export const DropMenuTrigger: React.FC<DropMenuTriggerProps> = ({
  children,
}) => {
  const { open, setOpen, triggerRef } = useDropMenuContext();
  const isString = typeof children === "string";

  return (
    <div
      ref={triggerRef as any}
      className="sui-dropmenu__trigger"
      onClick={() => setOpen((p) => !p)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // Only handle Enter on the trigger to OPEN the menu.
          // If it's already open, let the menu items or global listener handle selection.
          if (!open) {
            e.preventDefault();
            setOpen(true);
          }
        }
      }}
      role="button"
      tabIndex={isString ? 0 : undefined}
    >
      {isString ? <span>{children}</span> : children}
    </div>
  );
};
