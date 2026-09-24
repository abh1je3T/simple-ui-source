import React, { useRef } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

import { useDrawerLifecycle } from "./hooks/useDrawerLifecycle";
import { useDrawerAccessibility } from "./hooks/useDrawerAccessibility";
import { useDrawerSwipe } from "./hooks/useDrawerSwipe";

import "./drawer.scss";

export type DrawerAnchor = "left" | "right" | "top" | "bottom";
export type DrawerTone = "primary" | "secondary" | "tertiary";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;

  anchor?: DrawerAnchor;
  tone?: DrawerTone;

  children: React.ReactNode;
  showDragHandle?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  anchor = "right",
  tone = "neutral",
  showDragHandle = true,
  children,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const { mounted, visible } = useDrawerLifecycle(open);
  useDrawerAccessibility(open, drawerRef, onClose);
  const {
    handleHandlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  } = useDrawerSwipe(anchor, onClose, drawerRef);

  if (!mounted) return null;

  const handlePosition = {
    bottom: "top",
    top: "bottom",
    right: "left",
    left: "right",
  }[anchor] as DrawerAnchor;

  const handle = showDragHandle && (
    <div
      className={clsx(
        "sui-drawer__handle",
        `sui-drawer__handle--${handlePosition}`,
      )}
      onPointerDown={handleHandlePointerDown}
    />
  );

  return ReactDOM.createPortal(
    <div className="sui-drawer-root">
      <div
        className={clsx("sui-drawer-backdrop", { "is-visible": visible })}
        onClick={onClose}
      />

      <aside
        ref={drawerRef}
        className={clsx(
          "sui-drawer",
          `sui-drawer--${anchor}`,
          `sui-drawer--${tone}`,
          { "is-open": visible },
        )}
        role="dialog"
        aria-modal="true"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {(handlePosition === "top" || handlePosition === "left") && handle}
        <div className="sui-drawer__content">{children}</div>
        {(handlePosition === "bottom" || handlePosition === "right") && handle}
      </aside>
    </div>,
    document.body,
  );
};

export default Drawer;
