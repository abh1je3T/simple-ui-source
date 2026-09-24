import React, { useState, useEffect } from "react";
import { toastStore } from "../store/toastStore";
import { ToastItem } from "../types/Toast.types";
import ToastView from "./ToastView";

import "../styles/toast.scss";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface ToastContainerProps {
  position?: ToastPosition;
  gap?: number;
  maxToasts?: number;
  className?: string;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  position = "top-right",
  gap = 8,
  maxToasts = 5,
  className,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    toastStore.setMaxToasts(maxToasts);
  }, [maxToasts]);

  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  const classes = [
    "sui-toast-container",
    `sui-toast-container--${position}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={{ "--toast-gap": `${gap}px` } as any}>
      {toasts.map((toast) => (
        <ToastView key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
