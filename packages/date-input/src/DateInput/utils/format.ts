export type DateSegment = "DD" | "MM" | "YYYY" | "YY";

export interface SegmentMeta {
  segment: DateSegment;
  length: number;
  cellStart: number;
}

export interface ParsedFormat {
  segments: SegmentMeta[];
  totalLength: number;
  groups: number[];
}

// ── Segment lengths ────────────────────────────────────────────────────────

const SEGMENT_LENGTH: Record<DateSegment, number> = {
  DD: 2,
  MM: 2,
  YYYY: 4,
  YY: 2,
};

// ── Format validation ──────────────────────────────────────────────────────

/**
 * Rules that make a format structurally valid:
 *
 * 1. At least one segment.
 * 2. No duplicate segments.
 * 3. YY and YYYY are mutually exclusive.
 * 4. DD requires MM to be present (a day without a month is meaningless).
 * 5. All segments must be known DateSegment values.
 */
export function validateFormat(format: DateSegment[]): void {
  if (format.length === 0) {
    throw new Error("[DateInput] format must contain at least one segment.");
  }

  const known = new Set<string>(["DD", "MM", "YYYY", "YY"]);
  for (const seg of format) {
    if (!known.has(seg)) {
      throw new Error(
        `[DateInput] Unknown segment "${seg}". Valid segments: DD, MM, YYYY, YY.`,
      );
    }
  }

  const seen = new Set<DateSegment>();
  for (const seg of format) {
    if (seen.has(seg)) {
      throw new Error(
        `[DateInput] Duplicate segment "${seg}" in format [${format.join(", ")}].`,
      );
    }
    seen.add(seg);
  }

  if (seen.has("YYYY") && seen.has("YY")) {
    throw new Error(
      "[DateInput] YYYY and YY cannot both appear in the same format.",
    );
  }

  if (seen.has("DD") && !seen.has("MM")) {
    throw new Error(
      "[DateInput] DD requires MM to also be present in the format.",
    );
  }
}

// ── Parse ──────────────────────────────────────────────────────────────────

export function parseFormat(format: DateSegment[]): ParsedFormat {
  validateFormat(format);

  const segments: SegmentMeta[] = [];
  let cursor = 0;

  for (const segment of format) {
    const length = SEGMENT_LENGTH[segment];
    segments.push({ segment, length, cellStart: cursor });
    cursor += length;
  }

  return {
    segments,
    totalLength: cursor,
    groups: segments.map((s) => s.length),
  };
}

// ── Cell lookup ────────────────────────────────────────────────────────────

export function getCellSegment(
  cellIndex: number,
  segments: SegmentMeta[],
): { meta: SegmentMeta; posInSegment: number } | null {
  for (const meta of segments) {
    const end = meta.cellStart + meta.length;
    if (cellIndex >= meta.cellStart && cellIndex < end) {
      return { meta, posInSegment: cellIndex - meta.cellStart };
    }
  }
  return null;
}

// ── Serialise / parse ──────────────────────────────────────────────────────

export function serialiseValues(
  values: string[],
  segments: SegmentMeta[],
  separator: string,
): string {
  return segments
    .map((s) => values.slice(s.cellStart, s.cellStart + s.length).join(""))
    .join(separator);
}

export function parseValueString(
  value: string,
  segments: SegmentMeta[],
  separator: string,
  totalLength: number,
): string[] {
  const cells: string[] = Array(totalLength).fill("");

  if (!value) return cells;

  const parts = value.split(separator);

  segments.forEach((seg, i) => {
    const part = parts[i] ?? "";
    for (let j = 0; j < seg.length; j++) {
      cells[seg.cellStart + j] = part[j] ?? "";
    }
  });

  return cells;
}
