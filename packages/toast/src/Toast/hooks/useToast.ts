import { useCallback, useContext } from "react";
import { ToastItem } from "../types/Toast.types";
import { toastStore } from "../store/toastStore";
import { ToastContext } from "../context/ToastContext";

export const useToast = () => {
  const context = useContext(ToastContext);

  const createToast = useCallback((partial: Partial<ToastItem>) => {
    const id = crypto.randomUUID();
    toastStore.add({
      id,
      tone: "neutral",
      variant: "subtle",
      size: "md",
      duration: 3000,
      pauseOnHover: true,
      createdAt: Date.now(),
      ...partial,
    });
    return id;
  }, []);

  return {
    success: (msg: string, options?: Partial<ToastItem>) =>
      createToast({ title: msg, tone: "success", ...options }),

    error: (msg: string, options?: Partial<ToastItem>) =>
      createToast({ title: msg, tone: "error", ...options }),

    info: (msg: string, options?: Partial<ToastItem>) =>
      createToast({ title: msg, tone: "info", ...options }),

    warning: (msg: string, options?: Partial<ToastItem>) =>
      createToast({ title: msg, tone: "warning", ...options }),

    loading: (msg: string, options?: Partial<ToastItem>) =>
      createToast({ title: msg, tone: "neutral", status: "loading", ...options }),

    dismiss: (id: string) => toastStore.remove(id),
    clear: () => toastStore.clear(),

    promise: async <T,>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string;
        error: string;
      },
      options?: Partial<ToastItem>
    ) => {
      const id = createToast({
        title: messages.loading,
        status: "loading",
        tone: "neutral",
        ...options,
      });

      try {
        const result = await promise;
        toastStore.update(id, {
          title: messages.success,
          status: "success",
          tone: "success",
        });
        return result;
      } catch (e) {
        toastStore.update(id, {
          title: messages.error,
          status: "error",
          tone: "error",
        });
        throw e;
      }
    },

    // Legacy support
    addToast: createToast,
    removeToast: (id: string) => toastStore.remove(id),
    toasts: context?.toasts || [],
  };
};
