import { useEffect } from "react";

type Options = {
  open: boolean;
  onClose: () => void;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
};

export function useModalBehavior({
  open,
  onClose,
  closeOnEsc = true,
  closeOnOutsideClick = true,
  containerRef,
}: Options) {
  // ESC handler
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEsc, onClose]);

  // Outside click handler (pointer based)
  useEffect(() => {
    if (!open || !closeOnOutsideClick) return;

    const handlePointerDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;

      if (el.contains(e.target as Node)) return;

      onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open, closeOnOutsideClick, onClose, containerRef]);

  // Scroll lock
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
}
