import { useEffect, RefObject } from "react";

/**
 * Hook that alerts clicks outside of the passed ref(s)
 */
export const useClickOutside = (
  refs: RefObject<HTMLElement | null>[],
  handler: () => void,
  enabled: boolean,
) => {
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(target)
      );

      if (isOutside) {
        handler();
      }
    };

    if (enabled) {
      document.addEventListener("pointerdown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [refs, handler, enabled]);
};
