import clsx from "clsx";

import { TableProps } from "./types";
import "./table.scss";

import TableContext from "./context/TableContext";
import { TableBody } from "./ui/TableBody";
import TableHead from "./ui/TableHead";
import TableRow from "./ui/TableRow";
import TableCell from "./ui/TableCell";
import TableHeadCell from "./ui/TableHeadCell";

import { useTableLayout } from "./hooks/useTableLayout";
import { useState } from "react";

const TableBase = ({
  appearance = "solid",
  tone = "neutral",
  size = "comfortable",
  columns,
  sortState,
  onSortChange,
  columnWidths,
  onColumnResize,
  selectedKeys,
  onSelectionChange,
  sticky,
  draggableColumns,
  onColumnOrderChange,
  draggableRows,
  onRowOrderChange,
  allowPinning,
  onColumnPinChange,
  className,
  children,
}: TableProps) => {
  const [resizingColumn, setResizingColumn] = useState<string | number | null>(
    null,
  );
  const [draggingColumn, setDraggingColumn] = useState<string | null>(null);
  const [dragTarget, setDragTarget] = useState<{
    key: string;
    direction: "left" | "right";
  } | null>(null);

  const { gridTemplateColumns, getStickyOffset } = useTableLayout(
    columns,
    columnWidths,
    draggableRows,
    sticky
  );

  return (
    <TableContext.Provider
      value={{
        appearance,
        tone,
        size,
        columns,
        sortState,
        onSortChange,
        columnWidths,
        onColumnResize,
        resizingColumn,
        setResizingColumn,
        selectedKeys,
        onSelectionChange,
        sticky,
        draggableColumns,
        onColumnOrderChange,
        draggingColumn,
        setDraggingColumn,
        dragTarget,
        setDragTarget,
        draggableRows,
        onRowOrderChange,
        allowPinning,
        onColumnPinChange,
        gridTemplateColumns,
        getStickyOffset,
      }}
    >
      <div
        role="grid"
        className={clsx(
          "sui-table",
          `sui-table--${appearance}`,
          `sui-table--${tone}`,
          `sui-table--${size}`,
          resizingColumn && "is-resizing",
          className,
        )}
        style={{
          gridTemplateColumns,
        }}
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

const Table = Object.assign(TableBase, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeadCell: TableHeadCell,
});

export default Table;
