/* ─────────────────────────────────────────────
   Derive line-height from the live DOM element.
   Falls back to 20px if not readable yet.
───────────────────────────────────────────── */
function getLineHeight(el: HTMLTextAreaElement): number {
  const lh = parseFloat(window.getComputedStyle(el).lineHeight);
  return isNaN(lh) ? 20 : lh;
}

/* ─────────────────────────────────────────────
   Calculate the height the textarea should be.

   Strategy (Notion-like):
   1. Collapse to 1px so scrollHeight = content height only.
   2. Clamp between minRows and maxRows.
   3. If content exceeds maxRows → enable scroll, cap height.
   4. Otherwise keep overflow hidden (no scrollbar flash).
───────────────────────────────────────────── */
function measureHeight(
  el: HTMLTextAreaElement,
  minRows?: number,
  maxRows?: number,
): { height: number; overflow: "hidden" | "auto" } {
  const lh = getLineHeight(el);

  // reset so scrollHeight reflects actual content
  el.style.height = "1px";

  const contentHeight = el.scrollHeight;
  const minHeight = minRows != null ? minRows * lh : undefined;
  const maxHeight = maxRows != null ? maxRows * lh : undefined;

  let height = contentHeight;
  let overflow: "hidden" | "auto" = "hidden";

  if (minHeight != null && height < minHeight) height = minHeight;

  if (maxHeight != null && height > maxHeight) {
    height = maxHeight;
    overflow = "auto"; // content exceeds cap → show scrollbar
  }

  return { height, overflow };
}

export { getLineHeight, measureHeight };
