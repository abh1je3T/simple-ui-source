import { DateSegment } from "./format";

/**
 * Returns whether a digit is valid for the given position within a segment.
 *
 * DD  pos 0 → 0–3
 * DD  pos 1 → 0–9, but if pos 0 was 3 → only 0 or 1 (30, 31)
 * MM  pos 0 → 0–1
 * MM  pos 1 → 1–9, but if pos 0 was 1 → only 0, 1, 2 (10, 11, 12)
 * YY  → any digit 0–9 at any position
 * YYYY → any digit 0–9 at any position
 */
export function isDigitValid(
  digit: string,
  segment: DateSegment,
  posInSegment: number,
  currentValues: string[], // digits already in this segment
): boolean {
  if (!/^\d$/.test(digit)) return false;

  const n = parseInt(digit, 10);

  if (segment === "DD") {
    if (posInSegment === 0) return n >= 0 && n <= 3;
    if (posInSegment === 1) {
      const first = parseInt(currentValues[0] || "0", 10);
      if (first === 3) return n === 0 || n === 1; // 30 or 31
      return n >= 0 && n <= 9;
    }
  }

  if (segment === "MM") {
    if (posInSegment === 0) return n >= 0 && n <= 1;
    if (posInSegment === 1) {
      const first = parseInt(currentValues[0] || "0", 10);
      if (first === 1) return n === 0 || n === 1 || n === 2; // 10, 11, 12
      return n >= 1 && n <= 9; // 01–09
    }
  }

  // YY and YYYY: any digit is valid at any position
  return true;
}

/**
 * Returns true when typing this digit as the first character of a segment
 * means the second digit is already fully determined → skip ahead immediately.
 *
 * DD: first digit ≥ 4 → no valid day starts with 4–9
 * MM: first digit ≥ 2 → no valid month starts with 2–9
 * YY / YYYY: never auto-advance on the first digit
 */
export function shouldAutoAdvanceAfterFirstDigit(
  digit: string,
  segment: DateSegment,
): boolean {
  const n = parseInt(digit, 10);
  if (segment === "DD") return n >= 4;
  if (segment === "MM") return n >= 2;
  return false;
}
