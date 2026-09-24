import React, { useEffect, useState } from "react";
import { ToastItem } from "../types/Toast.types";
import { toastStore } from "../store/toastStore";
import CloseIcon from "./CloseIcon";
import { Loader } from "@simple-ui/loader";

interface ToastViewProps {
  toast: ToastItem;
}

const ToastView: React.FC<ToastViewProps> = ({ toast }) => {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (toast.duration === 0) return;
    if (toast.status === "loading") return; // Don't auto-dismiss while loading

    if (paused) return;

    const timer = setTimeout(() => {
      toastStore.remove(toast.id);
    }, toast.duration ?? 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, toast.status, paused]);

  const handleMouseEnter = () => {
    if (toast.pauseOnHover) {
      setPaused(true);
    }
  };

  const handleMouseLeave = () => {
    setPaused(false);
  };

  const classes = [
    "sui-toast",
    `sui-toast--${toast.tone}`,
    `sui-toast--${toast.variant}`,
    `sui-toast--${toast.size}`,
    toast.status && `sui-toast--${toast.status}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="status"
      aria-live="polite"
    >
      <div className="sui-toast__icon">
        {toast.status === "loading" ? <Loader size="sm" /> : toast.icon}
      </div>

      <div className="sui-toast__content">
        {toast.title && <div className="sui-toast__title">{toast.title}</div>}
        {toast.description && (
          <div className="sui-toast__description">{toast.description}</div>
        )}
      </div>

      <button
        className="sui-toast__close"
        onClick={() => toastStore.remove(toast.id)}
        aria-label="Close"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default ToastView;
