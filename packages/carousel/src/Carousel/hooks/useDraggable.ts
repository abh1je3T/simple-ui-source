import { useCallback, useRef } from "react";

interface UseDraggableOptions {
  /**
   * For marquee (transform-based) dragging.
   * Called on every mousemove with the cumulative dx and the scroll start position.
   */
  onDrag?: (dx: number, startScroll: number) => void;

  /**
   * Called on mouseup / touchend.
   * `moved` is true if the pointer travelled past the threshold.
   */
  onEnd?: (moved: boolean) => void;

  /**
   * Minimum px movement before drag is recognised. Default: 5.
   */
  threshold?: number;
}

interface DragHandlers {
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

/**
 * Attaches drag-to-scroll behaviour to a scrollable element (or transform-based
 * marquee track). Returns event handlers to spread onto the element and a
 * `wasDragging` ref so child click handlers can bail out when a drag just ended.
 */
export function useDraggable(
  elRef: React.RefObject<HTMLElement | null>,
  options: UseDraggableOptions = {},
): { handlers: DragHandlers; wasDragging: React.RefObject<boolean> } {
  const { onDrag, onEnd, threshold = 5 } = options;

  const startX = useRef(0);
  const startY = useRef(0);
  const startScroll = useRef(0);
  const isDragging = useRef(false);
  const moved = useRef(false);
  const wasDragging = useRef(false);

  const getClientX = (e: MouseEvent | TouchEvent) =>
    "touches" in e ? e.touches[0].clientX : e.clientX;

  const getClientY = (e: MouseEvent | TouchEvent) =>
    "touches" in e ? e.touches[0].clientY : e.clientY;

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current || !elRef.current) return;

      const dx = getClientX(e) - startX.current;
      const dy = getClientY(e) - startY.current;

      // Vertical scroll takes priority — cancel horizontal drag
      if (!moved.current && Math.abs(dy) > Math.abs(dx)) {
        isDragging.current = false;
        return;
      }

      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

      moved.current = true;
      wasDragging.current = true;
      elRef.current.classList.add("is-dragging");

      if (onDrag) {
        onDrag(dx, startScroll.current);
      } else {
        elRef.current.scrollLeft = startScroll.current - dx;
      }

      if ("preventDefault" in e && e.cancelable) e.preventDefault();
    },
    [elRef, onDrag, threshold],
  );

  const handleUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    elRef.current?.classList.remove("is-dragging");
    onEnd?.(moved.current);

    // Reset wasDragging after a tick so click handlers can read it first
    setTimeout(() => {
      wasDragging.current = false;
    }, 0);
  }, [elRef, onEnd]);

  const start = useCallback(
    (clientX: number, clientY: number) => {
      if (!elRef.current) return;
      startX.current = clientX;
      startY.current = clientY;
      startScroll.current = elRef.current.scrollLeft;
      isDragging.current = true;
      moved.current = false;

      window.addEventListener("mousemove", handleMove, { passive: false });
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleUp);
    },
    [elRef, handleMove, handleUp],
  );

  // Clean up global listeners after each interaction
  const cleanUp = useCallback(() => {
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("mouseup", handleUp);
    window.removeEventListener("touchmove", handleMove);
    window.removeEventListener("touchend", handleUp);
  }, [handleMove, handleUp]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      cleanUp();
      start(e.clientX, e.clientY);
    },
    [cleanUp, start],
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      cleanUp();
      start(e.touches[0].clientX, e.touches[0].clientY);
    },
    [cleanUp, start],
  );

  return { handlers: { onMouseDown, onTouchStart }, wasDragging };
}
