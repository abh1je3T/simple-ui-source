import { useState, useEffect, useCallback, RefObject } from "react";

export interface MenuPlacement {
  top: number;
  left: number;
  width: number;
}

/**
 * Hook to manage the absolute positioning of the portal menu relative to a trigger.
 */
export const useMenuPlacement = (
  triggerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
) => {
  const [placement, setPlacement] = useState<MenuPlacement>({
    top: 0,
    left: 0,
    width: 0,
  });

  const updatePlacement = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPlacement({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [triggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    updatePlacement();

    const observer = new ResizeObserver(updatePlacement);
    if (triggerRef.current) observer.observe(triggerRef.current);

    window.addEventListener("scroll", updatePlacement, true);
    window.addEventListener("resize", updatePlacement);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updatePlacement, true);
      window.removeEventListener("resize", updatePlacement);
    };
  }, [isOpen, updatePlacement, triggerRef]);

  return placement;
};
