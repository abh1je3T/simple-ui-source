import { useMemo } from "react";
import { TableColumn, ColumnWidthMap, TableSticky } from "../types";
import { resolveColumns } from "../utils/helper";

export const useTableLayout = (
  columns: TableColumn[] | undefined,
  columnWidths: ColumnWidthMap | undefined,
  draggableRows: boolean | undefined,
  sticky: TableSticky | undefined
) => {
  const gridTemplateColumns = useMemo(() => {
    const baseGrid = resolveColumns(columns, columnWidths) || "";
    return draggableRows ? `48px ${baseGrid}` : baseGrid;
  }, [columns, columnWidths, draggableRows]);

  const getStickyOffset = (columnKey: string | undefined) => {
    if (!columns || !columnKey) return undefined;

    const columnIndex = columns.findIndex((c) => c.key === columnKey);
    if (columnIndex === -1) return undefined;

    const columnDef = columns[columnIndex];
    const isPinned =
      columnDef.sticky || (sticky?.firstColumn && columnIndex === 0);

    if (!isPinned) return undefined;

    let offset = draggableRows ? 48 : 0;
    for (let i = 0; i < columnIndex; i++) {
      const prevCol = columns[i];
      const isPrevPinned = prevCol.sticky || (sticky?.firstColumn && i === 0);
      if (isPrevPinned) {
        const prevWidth = columnWidths?.[prevCol.key] || prevCol.width || 0;
        if (typeof prevWidth === "number") {
          offset += prevWidth;
        }
      }
    }
    return offset;
  };

  return {
    gridTemplateColumns,
    getStickyOffset,
  };
};
