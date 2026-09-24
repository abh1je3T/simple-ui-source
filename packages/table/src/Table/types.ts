export type TableAppearance = "solid" | "subtle";

export type TableTone =
  | "neutral"
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info";

export type TableSize = "compact" | "comfortable" | "spacious";

/* =========================
   SORTING
========================= */
export type SortDirection = "asc" | "desc";

export type TableSortState = {
  key: string;
  direction: SortDirection;
};

/* =========================
   COLUMN RESIZE
========================= */
export type ColumnWidth = number | string;

export type ColumnWidthMap = Record<string, ColumnWidth>;

export type ColumnResizeState = {
  columnKey: string;
  width: number;
};

export type TableSticky = {
  header?: boolean;
  firstColumn?: boolean;
};

/* =========================
   COLUMN MODEL
========================= */
export type TableColumn = {
  key: string;
  width?: ColumnWidth;

  sortable?: boolean;
  resizable?: boolean;

  label?: React.ReactNode;
  align?: "left" | "center" | "right";
  sticky?: boolean;
};

/* =========================
   TABLE PROPS
========================= */
export interface TableProps {
  appearance?: TableAppearance;
  tone?: TableTone;
  size?: TableSize;

  columns?: TableColumn[];

  sortState?: TableSortState;
  onSortChange?: (state: TableSortState) => void;

  columnWidths?: ColumnWidthMap;
  onColumnResize?: (next: ColumnWidthMap) => void;

  selectedKeys?: Set<string | number>;
  onSelectionChange?: (keys: Set<string | number>) => void;

  sticky?: TableSticky;

  // Drag and Drop
  draggableColumns?: boolean;
  onColumnOrderChange?: (keys: string[]) => void;

  draggableRows?: boolean;
  onRowOrderChange?: (keys: Array<string | number>) => void;

  allowPinning?: boolean;
  onColumnPinChange?: (columnKey: string, pinned: boolean) => void;

  className?: string;
  children?: React.ReactNode;
}
