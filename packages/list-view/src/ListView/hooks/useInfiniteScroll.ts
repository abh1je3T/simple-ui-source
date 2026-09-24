import { useEffect } from "react";

type Options = {
  containerRef: React.RefObject<HTMLElement | null>;
  onEndReached?: () => void;
  threshold?: number;
  enabled?: boolean;
};

export function useInfiniteScroll({
  containerRef,
  onEndReached,
  threshold = 0.8,
  enabled = true,
}: Options) {
  useEffect(() => {
    if (!enabled || !onEndReached) return;

    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollPosition = el.scrollTop + el.clientHeight;

      const triggerPoint = el.scrollHeight * threshold;

      if (scrollPosition >= triggerPoint) {
        onEndReached();
      }
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, onEndReached, threshold, enabled]);
}
