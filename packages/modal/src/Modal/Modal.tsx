import React, { useRef } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

import { useModalBehavior } from "./hooks/useModalBehavior";
import "./modal.scss";
import { useFocusTrap } from "./hooks/useFocusTrap";

export type ModalTone = "primary" | "secondary" | "tertiary";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  open: boolean;
  onClose: () => void;

  children: React.ReactNode;

  title?: React.ReactNode;
  description?: React.ReactNode;

  size?: "sm" | "md" | "lg" | "xl";
  tone?: "primary" | "secondary" | "tertiary";

  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;

  showCloseIcon?: boolean;

  preventScrollLock?: boolean;

  initialFocusRef?: React.RefObject<HTMLElement>;
}
const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  tone = "secondary",
  size = "md",
  closeOnBackdropClick = true,
  closeOnEsc = true,
  showCloseIcon = true,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useModalBehavior({
    open,
    onClose,
    closeOnEsc,
    closeOnOutsideClick: closeOnBackdropClick,
    containerRef: dialogRef,
  });

  useFocusTrap({
    open,
    containerRef: dialogRef,
  });

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="sui-modal-root">
      <div className="sui-modal-backdrop" />

      <div className="sui-modal-center">
        <div
          ref={dialogRef}
          className={clsx(
            "sui-modal",
            `sui-modal--${tone}`,
            `sui-modal--${size}`,
          )}
          role="dialog"
          aria-modal="true"
        >
          {(title || showCloseIcon) && (
            <div className="sui-modal__header">
              <div className="sui-modal__title">{title}</div>

              {showCloseIcon && (
                <button className="sui-modal__close" onClick={onClose}>
                  ✕
                </button>
              )}
            </div>
          )}

          <div className="sui-modal__content">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
