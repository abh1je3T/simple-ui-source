export type ToastTone =
  | "neutral"
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info";

export type ToastVariant = "subtle" | "solid";
export type ToastSize = "sm" | "md" | "lg";

export interface ToastItem {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;

  tone: ToastTone;
  variant: ToastVariant;
  size: ToastSize;

  icon?: React.ReactNode;
  duration?: number;
  pauseOnHover?: boolean;
  createdAt: number;

  /** for promise support */
  status?: "loading" | "success" | "error";
}
