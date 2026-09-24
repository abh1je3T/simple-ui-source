import React from "react";
import clsx from "clsx";
import { useTable } from "../context/TableContext";
import { MdDragIndicator } from "react-icons/md";

type Props = {
  children: React.ReactNode;

  /** future drag support (no logic yet) */
  rowId?: string | number;

  className?: string;
  variant?: "head" | "body";
};

const TableRow: React.FC<Props> = ({
  children,
  className,
  rowId,
  variant = "body",
}) => {
  const {
    appearance,
    draggableRows,
    onRowOrderChange,
    gridTemplateColumns,
    sticky,
    columns,
  } = useTable();

  const isDraggable = draggableRows && variant === "body";
  // The drag handle column should be sticky if any column pinning is active
  const hasPinnedColumns = columns?.some((c) => c.sticky);
  const isStickyHandle =
    draggableRows &&
    (sticky?.firstColumn || sticky?.header || hasPinnedColumns);

  const handleDragStart = (e: React.DragEvent) => {
    if (!isDraggable || rowId === undefined) return;
    e.dataTransfer.setData("rowId", String(rowId));
    e.dataTransfer.effectAllowed = "move";
    (e.currentTarget as HTMLElement).classList.add("is-dragging");
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).classList.remove("is-dragging");
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isDraggable) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isDraggable || !onRowOrderChange || rowId === undefined) return;
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("rowId");

    if (draggedId === String(rowId)) return;

    onRowOrderChange([draggedId, String(rowId)]);
  };

  return (
    <div
      className={clsx(
        "sui-table__row",
        variant === "head" && "sui-table__head-row",
        `sui-table__row--${appearance}`,
        // When draggableRows is enabled, all rows must use display: grid to stay aligned
        (isDraggable || (draggableRows && variant === "head")) &&
          "is-draggable",
        className,
      )}
      style={{
        gridTemplateColumns: draggableRows ? gridTemplateColumns : undefined,
      }}
      role="row"
      data-table-row
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {draggableRows && (
        <div
          className={clsx(
            "sui-table__cell",
            "sui-table__drag-handle-cell",
            variant === "head" && "sui-table__cell--head",
            isStickyHandle && "is-sticky-first-column",
          )}
          role="gridcell"
          style={{
            left: isStickyHandle ? 0 : undefined,
          }}
        >
          {variant === "body" && (
            <span className="sui-table__drag-handle">
              <MdDragIndicator />
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default TableRow;
