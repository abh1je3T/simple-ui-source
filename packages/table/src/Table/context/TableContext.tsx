import { createContext, useContext } from "react";
import {
  TableAppearance,
  TableTone,
  TableSize,
  TableSortState,
  ColumnWidthMap,
  TableColumn,
  TableSticky,
} from "../types";

type TableContextValue = {
  appearance: TableAppearance;
  tone: TableTone;
  size: TableSize;

  columns?: TableColumn[];

  sortState?: TableSortState;
  onSortChange?: (state: TableSortState) => void;

  columnWidths?: ColumnWidthMap;
  onColumnResize?: (next: ColumnWidthMap) => void;

  resizingColumn?: string | number | null;
  setResizingColumn?: (key: string | number | null) => void;

  sticky?: TableSticky;

  selectedKeys?: Set<string | number>;
  onSelectionChange?: (keys: Set<string | number>) => void;


  // DND
  draggableColumns?: boolean;
  onColumnOrderChange?: (keys: string[]) => void;
  draggingColumn?: string | null;
  setDraggingColumn?: (key: string | null) => void;
  dragTarget?: { key: string; direction: "left" | "right" } | null;
  setDragTarget?: (target: { key: string; direction: "left" | "right" } | null) => void;
  draggableRows?: boolean;
  onRowOrderChange?: (keys: Array<string | number>) => void;

  allowPinning?: boolean;
  onColumnPinChange?: (columnKey: string, pinned: boolean) => void;

  gridTemplateColumns?: string;
  getStickyOffset: (key: string | undefined) => number | undefined;
};

const TableContext = createContext<TableContextValue | null>(null);

export const useTable = () => {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error("Table components must be inside <Table>");
  }
  return ctx;
};

export default TableContext;
