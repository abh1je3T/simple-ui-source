import { useEffect, useLayoutEffect, useRef, useState } from "react";

const CLOSE_DURATION_MS = 300; // must match --animation-duration-md in scss

/**
 * Manages mount/unmount lifecycle for a transition-based drawer.
 *
 * Open animation fix: React 18 batches state updates, so a single
 * requestAnimationFrame after setMounted(true) still runs before the
 * browser has painted the off-screen state — the transition is skipped.
 * The fix is useLayoutEffect to set mounted synchronously, then a double
 * rAF so the browser has painted at least one frame before we add is-open.
 */
export function useDrawerLifecycle(open: boolean) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  // Mount synchronously so the DOM node exists before we trigger the transition
  useLayoutEffect(() => {
    if (open) {
      setMounted(true);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }

      // Double rAF: first frame mounts + paints off-screen state,
      // second frame adds is-open so the browser transitions from it.
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);

      closeTimer.current = setTimeout(() => {
        setMounted(false);
        closeTimer.current = null;
      }, CLOSE_DURATION_MS);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [open]);

  return { mounted, visible };
}
