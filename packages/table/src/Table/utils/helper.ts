import { ColumnWidthMap, TableColumn } from "../types";

const resolveColumns = (
  columns?: TableColumn[],
  widths?: ColumnWidthMap,
): string | undefined => {
  if (!columns) return undefined;

  return columns
    .map((col) => {
      const w = widths?.[col.key] || col.width || "1fr";
      return typeof w === "number" ? `${w}px` : w;
    })
    .join(" ");
};

export { resolveColumns };
