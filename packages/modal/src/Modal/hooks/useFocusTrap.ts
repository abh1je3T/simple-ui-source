import { useEffect, useRef } from "react";

type Options = {
  open: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  initialFocusRef?: React.RefObject<HTMLElement>;
};

export function useFocusTrap({ open, containerRef, initialFocusRef }: Options) {
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const el = containerRef.current;
    if (!el) return;

    // Save previously focused element
    lastActiveElement.current = document.activeElement as HTMLElement;

    const focusableSelectors = [
      "button",
      "[href]",
      "input",
      "select",
      "textarea",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    const focusable = Array.from(
      el.querySelectorAll<HTMLElement>(focusableSelectors),
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // ✅ PRIORITY: initialFocusRef > first focusable > container
    const initialEl = initialFocusRef?.current ?? first ?? el;

    initialEl?.focus?.();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || active === el) {
          e.preventDefault();
          last?.focus();
        }
        return;
      }

      if (active === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // restore previous focus
      lastActiveElement.current?.focus?.();
    };
  }, [open, containerRef, initialFocusRef]);
}
