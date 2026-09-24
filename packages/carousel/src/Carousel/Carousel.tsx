import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import clsx from "clsx";
import "./carousel.scss";

/* =========================================================
   TYPES
========================================================= */

export interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  /** Maximum items per view - will show fewer if items don't fit */
  itemsPerView?: number | { [containerWidth: number]: number };
  autoScroll?: boolean;
  autoScrollInterval?: number;
  pauseOnHover?: boolean;
  infinite?: boolean;
}

/* =========================================================
   HELPERS (PURE FUNCTIONS)
========================================================= */

const getItems = (el: HTMLElement) =>
  Array.from(el.querySelectorAll<HTMLElement>(".carousel__item"));

/**
 * Calculate how many items can fit based on container width, item min-width, and gap.
 * Returns a number <= maxItemsPerView.
 */
const calculateFittingItems = (
  containerWidth: number,
  itemMinWidth: number,
  gap: number,
  maxItemsPerView: number,
): number => {
  if (containerWidth === 0) return 1;

  const itemWithGap = itemMinWidth + gap;
  const fittingItems = Math.floor((containerWidth + gap) / itemWithGap);

  return Math.max(1, Math.min(fittingItems, maxItemsPerView));
};

/**
 * Get the maximum items per view for current container width
 */
const getMaxItemsPerView = (
  itemsPerView: CarouselProps["itemsPerView"],
  containerWidth: number,
): number => {
  if (typeof itemsPerView === "number") return itemsPerView;
  if (!itemsPerView) return 1;

  const breakpoints = Object.keys(itemsPerView)
    .map(Number)
    .sort((a, b) => b - a);

  const matchedBreakpoint = breakpoints.find((bp) => containerWidth >= bp);
  return matchedBreakpoint ? itemsPerView[matchedBreakpoint] : 1;
};

/** Convert calc-fitted items to CSS custom property */
const getItemsPerViewStyle = (count: number): React.CSSProperties =>
  ({
    "--items-per-view": count,
  }) as React.CSSProperties;

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Carousel: React.FC<CarouselProps> = ({
  children,
  className,
  gap = 16,
  itemsPerView = 4,
  autoScroll = false,
  autoScrollInterval = 3000,
  pauseOnHover = true,
  infinite = false,
}) => {
  /* -----------------------------
     REFS
  ----------------------------- */
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const isProgrammaticScroll = useRef(false);

  /* -----------------------------
     STATE
  ----------------------------- */
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [fittedItemsPerView, setFittedItemsPerView] = useState(1);

  /* -----------------------------
     DERIVED DATA
  ----------------------------- */
  const originalChildren = React.Children.toArray(children);
  const totalSlides = originalChildren.length;

  const cloneCount = useMemo(() => {
    if (!infinite) return 0;
    return Math.max(fittedItemsPerView + 1, 2);
  }, [infinite, fittedItemsPerView]);

  const prependClones = useMemo(() => {
    if (cloneCount === 0) return [];
    return originalChildren.slice(-cloneCount).map((child, i) => (
      <div
        className="carousel__item"
        key={`clone-start-${i}`}
        data-clone="true"
      >
        {child}
      </div>
    ));
  }, [cloneCount, originalChildren]);

  const appendClones = useMemo(() => {
    if (cloneCount === 0) return [];
    return originalChildren.slice(0, cloneCount).map((child, i) => (
      <div className="carousel__item" key={`clone-end-${i}`} data-clone="true">
        {child}
      </div>
    ));
  }, [cloneCount, originalChildren]);

  const slides = useMemo(() => {
    return originalChildren.map((child, i) => (
      <div className="carousel__item" key={`slide-${i}`} data-slide={i}>
        {child}
      </div>
    ));
  }, [originalChildren]);

  const allSlides = useMemo(() => {
    return [...prependClones, ...slides, ...appendClones];
  }, [prependClones, slides, appendClones]);

  /* =========================================================
     RESPONSIVE CALCULATION
  ========================================================= */

  const updateFittedItems = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const containerWidth = el.clientWidth;
    const maxItems = getMaxItemsPerView(itemsPerView, containerWidth);

    // Get the min-width of carousel items from CSS
    const firstItem = el.querySelector<HTMLElement>(".carousel__item");
    if (!firstItem) return;

    const computedStyle = getComputedStyle(firstItem);
    const minWidth = parseFloat(computedStyle.minWidth) || 200;

    const fitted = calculateFittingItems(
      containerWidth,
      minWidth,
      gap,
      maxItems,
    );

    setFittedItemsPerView(fitted);
  }, [itemsPerView, gap]);

  /* =========================================================
     CORE LOGIC
  ========================================================= */

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const items = getItems(el);
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    const threshold = 2;

    setCanScrollLeft(el.scrollLeft > first.offsetLeft + threshold);

    setCanScrollRight(
      el.scrollLeft + el.clientWidth <
        last.offsetLeft + last.offsetWidth - threshold,
    );
  }, []);

  const handleScroll = useCallback(() => {
    updateScrollState();
    updateFittedItems();
  }, [updateScrollState, updateFittedItems]);

  /* =========================================================
     INFINITE LOGIC
  ========================================================= */

  const resetInfinitePosition = useCallback(() => {
    if (!infinite) return;

    const el = scrollRef.current;
    if (!el || totalSlides <= 1) return;

    const first = el.querySelector<HTMLElement>('[data-slide="0"]');
    const last = el.querySelector<HTMLElement>(
      `[data-slide="${totalSlides - 1}"]`,
    );

    if (!first || !last) return;

    const start = first.offsetLeft;
    const end = last.offsetLeft + last.offsetWidth;
    const width = end - start;

    if (el.scrollLeft <= start) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft += width;
      el.style.scrollBehavior = "smooth";
      handleScroll();
    } else if (el.scrollLeft >= end - el.clientWidth) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft -= width;
      el.style.scrollBehavior = "smooth";
      handleScroll();
    }
  }, [infinite, totalSlides, handleScroll]);

  /* =========================================================
     SCROLL HELPERS
  ========================================================= */

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const items = getItems(el);
    const target = items[index];

    if (!target) return;

    isProgrammaticScroll.current = true;

    el.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  const scrollByOne = useCallback(
    (dir: "left" | "right") => {
      const el = scrollRef.current;
      if (!el) return;

      const items = getItems(el);
      if (!items.length) return;

      // Find the item that is closest to the LEFT edge of the viewport
      // This is more reliable than center-based detection
      const viewportLeft = el.scrollLeft;

      let current = 0;
      let closest = Infinity;

      items.forEach((item, i) => {
        const itemLeft = item.offsetLeft;
        // Find the item that starts closest to the viewport's left edge
        const dist = Math.abs(itemLeft - viewportLeft);
        if (dist < closest) {
          closest = dist;
          current = i;
        }
      });

      let next = dir === "right" ? current + 1 : current - 1;

      if (infinite) {
        // Infinite mode: wrap around using clones
        if (next >= items.length) {
          next = cloneCount; // Jump to first real slide via clone
        } else if (next < 0) {
          next = items.length - 1 - cloneCount; // Jump to last real slide via clone
        }
      } else {
        // Non-infinite mode: clamp to boundaries
        if (next >= items.length) {
          next = items.length - 1;
        } else if (next < 0) {
          next = 0;
        }
      }

      // Only scroll if we're actually moving to a different item
      if (next !== current) {
        scrollToIndex(next);
      }
    },
    [cloneCount, infinite, scrollToIndex],
  );

  /* =========================================================
     EFFECTS
  ========================================================= */

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    handleScroll();

    el.addEventListener("scroll", handleScroll, { passive: true });

    const ro = new ResizeObserver(handleScroll);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      ro.disconnect();
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!infinite) return;

    const el = scrollRef.current;
    if (!el) return;

    const onScrollEnd = () => {
      if (!isProgrammaticScroll.current) return;
      isProgrammaticScroll.current = false;
      resetInfinitePosition();
    };

    el.addEventListener("scrollend", onScrollEnd);

    return () => el.removeEventListener("scrollend", onScrollEnd);
  }, [infinite, resetInfinitePosition]);

  useLayoutEffect(() => {
    if (!infinite || !scrollRef.current || totalSlides <= 1) return;

    const el = scrollRef.current;
    const first = el.querySelector<HTMLElement>('[data-slide="0"]');

    if (first) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = first.offsetLeft;
      el.style.scrollBehavior = "smooth";
      handleScroll();
    }
  }, [infinite, totalSlides, handleScroll]);

  /* =========================================================
     AUTO SCROLL
  ========================================================= */

  useEffect(() => {
    if (!autoScroll) return;
    if (pauseOnHover && isHovered) return;

    intervalRef.current = window.setInterval(() => {
      scrollByOne("right");
    }, autoScrollInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoScroll, autoScrollInterval, isHovered, pauseOnHover, scrollByOne]);

  /* =========================================================
     RENDER
  ========================================================= */

  const hideControls = infinite && autoScroll;

  return (
    <div className="carousel-wrapper">
      {!hideControls && (
        <button
          className="carousel-arrow carousel-arrow--left"
          disabled={!canScrollLeft}
          onClick={() => scrollByOne("left")}
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}

      <div
        ref={scrollRef}
        className={clsx("carousel", className)}
        style={
          {
            "--carousel-gap": `${gap}px`,
            ...getItemsPerViewStyle(fittedItemsPerView),
          } as React.CSSProperties
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {infinite ? allSlides : slides}
      </div>

      {!hideControls && (
        <button
          className="carousel-arrow carousel-arrow--right"
          disabled={!canScrollRight}
          onClick={() => scrollByOne("right")}
          aria-label="Scroll right"
        >
          ›
        </button>
      )}
    </div>
  );
};

export default Carousel;
