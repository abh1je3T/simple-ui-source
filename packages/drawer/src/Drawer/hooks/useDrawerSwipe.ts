import { useRef, useCallback, RefObject } from "react";
import { DrawerAnchor } from "../Drawer";

const SWIPE_THRESHOLD = 60;

export function useDrawerSwipe(
  anchor: DrawerAnchor,
  onClose: () => void,
  drawerRef: RefObject<HTMLElement | null>,
) {
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const anchorRef = useRef(anchor);
  anchorRef.current = anchor;

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const applyTranslate = useCallback(
    (dx: number, dy: number) => {
      const el = drawerRef.current;
      if (!el) return;

      el.style.transition = "none";

      const a = anchorRef.current;

      let tx = 0;
      let ty = 0;

      if (a === "left") {
        tx = Math.min(dx, 0); // only left drag allowed
        el.style.transform = `translateX(${tx}px)`;
      }

      if (a === "right") {
        tx = Math.max(dx, 0); // only right drag allowed
        el.style.transform = `translateX(${tx}px)`;
      }

      if (a === "bottom") {
        ty = Math.max(dy, 0); // only down drag allowed
        el.style.transform = `translateY(${ty}px)`;
      }

      if (a === "top") {
        ty = Math.min(dy, 0); // only up drag allowed
        el.style.transform = `translateY(${ty}px)`;
      }
    },
    [drawerRef],
  );

  const reset = useCallback(() => {
    const el = drawerRef.current;
    if (!el) return;

    el.style.transition = "";
    el.style.transform = "";
  }, [drawerRef]);

  const shouldClose = (dx: number, dy: number): boolean => {
    const a = anchorRef.current;

    if (a === "left" && dx < -SWIPE_THRESHOLD) return true;
    if (a === "right" && dx > SWIPE_THRESHOLD) return true;
    if (a === "bottom" && dy > SWIPE_THRESHOLD) return true;
    if (a === "top" && dy < -SWIPE_THRESHOLD) return true;

    return false;
  };

  const endGesture = useCallback(
    (dx: number, dy: number) => {
      if (shouldClose(dx, dy)) {
        const el = drawerRef.current;
        if (el) {
          el.style.transition = "";
          el.style.transform = "";
        }
        onCloseRef.current();
      } else {
        reset();
      }
    },
    [reset, drawerRef],
  );

  const handleHandlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };

      drawerRef.current?.setPointerCapture(e.pointerId);
    },
    [drawerRef],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;

      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      const a = anchorRef.current;

      if (a === "right") {
        applyTranslate(Math.max(dx, 0), 0);
        return;
      }

      if (a === "left") {
        applyTranslate(Math.min(dx, 0), 0);
        return;
      }

      if (a === "top") {
        applyTranslate(0, Math.min(dy, 0));
        return;
      }

      if (a === "bottom") {
        applyTranslate(0, Math.max(dy, 0));
        return;
      }
    },
    [applyTranslate],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;

      isDragging.current = false;

      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      endGesture(dx, dy);
    },
    [endGesture],
  );

  const handlePointerCancel = useCallback(() => {
    isDragging.current = false;
    reset();
  }, [reset]);

  return {
    handleHandlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  };
}
