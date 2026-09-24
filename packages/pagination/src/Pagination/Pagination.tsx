import React, { useEffect, useMemo } from "react";
import "./pagination.scss";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;

  size?: "sm" | "md" | "lg";
  tone?: "primary" | "neutral" | "success" | "warning" | "error";
  variant?: "solid" | "subtle";

  siblingCount?: number;
  /** Must be >= 1 */
  boundaryCount?: number;

  showPrevNext?: boolean;
  className?: string;
}

// Inclusive range. Returns [] when start > end.
const range = (start: number, end: number): number[] =>
  start > end
    ? []
    : Array.from({ length: end - start + 1 }, (_, i) => start + i);

type PageItem = number | "left-dots" | "right-dots";

function buildPages(
  safePage: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number,
): PageItem[] {
  // Clamp boundaryCount to a minimum of 1 to avoid range(n+1, n) bugs
  const bc = Math.max(boundaryCount, 1);

  const totalPageNumbers = bc * 2 + siblingCount * 2 + 3;

  // No truncation needed — show everything
  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages);
  }

  const firstPages = range(1, bc);
  const lastPages = range(totalPages - bc + 1, totalPages);

  // Sibling window, clamped so it never overlaps boundary pages
  const siblingLeft = Math.max(safePage - siblingCount, bc + 2);
  const siblingRight = Math.min(safePage + siblingCount, totalPages - bc - 1);

  const showLeftDots = siblingLeft > bc + 2;
  const showRightDots = siblingRight < totalPages - bc - 1;

  const middle = range(siblingLeft, siblingRight);

  const result: PageItem[] = [...firstPages];

  if (showLeftDots) {
    result.push("left-dots");
  } else {
    // Fill gap between boundary and sibling window with no dots
    result.push(...range(bc + 1, siblingLeft - 1));
  }

  result.push(...middle);

  if (showRightDots) {
    result.push("right-dots");
  } else {
    result.push(...range(siblingRight + 1, totalPages - bc));
  }

  result.push(...lastPages);

  return result;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
  size = "md",
  tone = "primary",
  variant = "solid",
  siblingCount = 1,
  boundaryCount = 1,
  showPrevNext = true,
  className,
}) => {
  const safePage = Math.min(Math.max(page, 1), totalPages);

  // Notify parent if the page prop was out of range
  useEffect(() => {
    if (page !== safePage) {
      onChange(safePage);
    }
  }, [page, safePage, onChange]);

  const pages = useMemo(
    () => buildPages(safePage, totalPages, siblingCount, boundaryCount),
    [safePage, totalPages, siblingCount, boundaryCount],
  );

  const rootClass = [
    "sui-pagination",
    `sui-pagination--${size}`,
    `sui-pagination--${tone}`,
    `sui-pagination--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handlePrev = () => {
    if (safePage > 1) onChange(safePage - 1);
  };

  const handleNext = () => {
    if (safePage < totalPages) onChange(safePage + 1);
  };

  return (
    <nav className={rootClass} aria-label="Pagination">
      {showPrevNext && (
        <button
          className="sui-pagination__nav sui-pagination__nav--prev"
          disabled={safePage === 1}
          onClick={handlePrev}
          aria-label="Previous page"
        >
          Prev
        </button>
      )}

      {pages.map((p) => {
        if (p === "left-dots" || p === "right-dots") {
          return (
            <span
              key={p}
              className="sui-pagination__ellipsis"
              aria-hidden="true"
            >
              …
            </span>
          );
        }

        const isActive = safePage === p;
        return (
          <button
            key={p}
            className={["sui-pagination__item", isActive ? "is-active" : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onChange(p)}
            aria-label={`Page ${p}`}
            aria-current={isActive ? "page" : undefined}
          >
            {p}
          </button>
        );
      })}

      {showPrevNext && (
        <button
          className="sui-pagination__nav sui-pagination__nav--next"
          disabled={safePage === totalPages}
          onClick={handleNext}
          aria-label="Next page"
        >
          Next
        </button>
      )}
    </nav>
  );
};

export default Pagination;
