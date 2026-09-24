import React, { createContext, useState, useEffect, useCallback } from "react";
import { ToastItem } from "../types/Toast.types";
import { toastStore } from "../store/toastStore";

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Partial<ToastItem>) => string;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  const addToast = useCallback((toast: Partial<ToastItem>) => {
    const id = crypto.randomUUID();
    const newToast: ToastItem = {
      id,
      tone: "neutral",
      variant: "subtle",
      size: "md",
      duration: 3000,
      pauseOnHover: true,
      createdAt: Date.now(),
      ...toast,
    };
    toastStore.add(newToast);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    toastStore.remove(id);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
