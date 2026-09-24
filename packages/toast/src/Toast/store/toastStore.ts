import { ToastItem } from "../types/Toast.types";

class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners = new Set<(toasts: ToastItem[]) => void>();
  private maxToasts = 5;

  subscribe = (cb: (toasts: ToastItem[]) => void) => {
    this.listeners.add(cb);
    cb(this.toasts);
    return () => {
      this.listeners.delete(cb);
    };
  };

  private emit = () => {
    this.listeners.forEach((cb) => cb([...this.toasts]));
  };

  setMaxToasts = (limit: number) => {
    this.maxToasts = limit;
    if (this.toasts.length > limit) {
      this.toasts = this.toasts.slice(0, limit);
      this.emit();
    }
  };

  add = (toast: ToastItem) => {
    this.toasts = [toast, ...this.toasts].slice(0, this.maxToasts);
    this.emit();
  };

  remove = (id: string) => {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.emit();
  };

  update = (id: string, patch: Partial<ToastItem>) => {
    this.toasts = this.toasts.map((t) =>
      t.id === id ? { ...t, ...patch } : t,
    );
    this.emit();
  };

  clear = () => {
    this.toasts = [];
    this.emit();
  };

  getToasts = () => this.toasts;
}

export const toastStore = new ToastStore();
