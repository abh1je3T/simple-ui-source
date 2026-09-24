import { useEffect, useRef, RefObject } from "react";

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Handles all accessibility concerns for an open drawer:
 * - Locks body scroll while open
 * - Closes on Escape
 * - Traps Tab focus within the drawer
 * - Restores focus to the previously focused element on close
 */
export function useDrawerAccessibility(
  open: boolean,
  drawerRef: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Capture the element that had focus before the drawer opened
  useEffect(() => {
    if (open) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
    } else {
      lastFocusedElement.current?.focus?.();
    }
  }, [open]);

  // ESC + focus trap + body scroll lock
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const root = drawerRef.current;
        if (!root) return;

        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
        ).filter((el) => !el.hasAttribute("disabled"));

        if (!focusable.length) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, drawerRef]);
}
