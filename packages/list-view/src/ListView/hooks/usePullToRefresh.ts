import { useEffect, useRef, useState } from "react";

type Options = {
  containerRef: React.RefObject<HTMLElement | null>;
  onRefresh?: () => void;
  enabled?: boolean;
  refreshing?: boolean;
};

export function usePullToRefresh({
  containerRef,
  onRefresh,
  enabled = true,
  refreshing = false,
}: Options) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const startY = useRef(0);
  const THRESHOLD = 60;

  useEffect(() => {
    if (!enabled || !onRefresh) return;

    const el = containerRef.current;
    if (!el) return;

    const handlePointerDown = (e: PointerEvent) => {
      // Only start pulling if we are at the top and it's a primary button/touch
      if (el.scrollTop <= 0 && e.isPrimary) {
        startY.current = e.clientY;
        setIsPulling(true);
        // Capture pointer to continue receiving events even if moved outside el
        try {
          el.setPointerCapture(e.pointerId);
        } catch (err) {
          // ignore
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPulling) return;

      const currentY = e.clientY;
      const diff = currentY - startY.current;

      if (diff > 0 && el.scrollTop <= 0) {
        // Apply rubber-band dampening
        const dampenedDiff = Math.min(Math.pow(diff, 0.75) * 2.5, 120);
        setPullDistance(dampenedDiff);

        // Prevent default behavior (like text selection) on desktop
        if (el.style) {
          el.style.userSelect = "none";
          el.style.touchAction = "none";
        }
      } else if (diff < 0) {
        // If pulling up, stop the pull interaction
        setIsPulling(false);
        setPullDistance(0);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isPulling) {
        if (pullDistance >= THRESHOLD) {
          onRefresh();
        }
        setIsPulling(false);
        setPullDistance(0);

        try {
          el.releasePointerCapture(e.pointerId);
        } catch (err) {
          // ignore
        }

        if (el.style) {
          el.style.userSelect = "";
          el.style.touchAction = "";
        }
      }
    };

    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointercancel", handlePointerUp);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [containerRef, onRefresh, enabled, isPulling, pullDistance]);

  return {
    pullDistance: refreshing ? THRESHOLD : pullDistance,
    isPulling,
  };
}
