import { useState, useEffect } from "react";

export function useDropPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  contentRef: React.RefObject<HTMLElement | null>,
  open: boolean,
) {
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");

  useEffect(() => {
    if (!open) return;

    let raf = 0;

    const calculate = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const trigger = triggerRef.current;
        const content = contentRef.current;

        if (!trigger || !content) return;

        const rect = trigger.getBoundingClientRect();

        const contentHeight = content.offsetHeight || 0;
        const contentWidth = content.offsetWidth || 0;

        const vh = window.innerHeight;
        const vw = window.innerWidth;

        const spaceBelow = vh - rect.bottom;
        const spaceAbove = rect.top;

        const spaceRight = vw - rect.left;
        const spaceLeft = rect.right;

        // =========================
        // Y AXIS (flip logic)
        // =========================
        const topPlacement =
          spaceBelow < contentHeight && spaceAbove > spaceBelow;

        setPlacement(topPlacement ? "top" : "bottom");

        // =========================
        // X CLAMP (collision fix)
        // =========================
        let left = rect.left;

        if (spaceRight < contentWidth) {
          left = vw - contentWidth - 8;
        }

        if (spaceLeft < 0) {
          left = 8;
        }

        content.style.left = `${left}px`;
      });
    };

    calculate();

    window.addEventListener("resize", calculate);
    window.addEventListener("scroll", calculate, true);

    const ro = new ResizeObserver(calculate);
    if (contentRef.current) ro.observe(contentRef.current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", calculate);
      window.removeEventListener("scroll", calculate, true);
      ro.disconnect();
    };
  }, [open, contentRef, triggerRef]);

  return placement;
}
