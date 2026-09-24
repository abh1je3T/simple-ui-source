import React from "react";
import clsx from "clsx";
import { useTable } from "../context/TableContext";
import { MdDragIndicator, MdPushPin, MdOutlinePushPin } from "react-icons/md";
import { useColumnResize } from "../hooks/useColumnResize";
import { useColumnDND } from "../hooks/useColumnDND";
import { useColumnSort } from "../hooks/useColumnSort";

type Props = {
  children: React.ReactNode;
  sortKey?: string;
  sortIcon?: (direction: "asc" | "desc") => React.ReactNode;
  className?: string;
};

const TableHeadCell: React.FC<Props & { align?: "left" | "center" | "right" }> = ({
  children,
  sortKey,
  sortIcon,
  className,
  align,
}) => {
  const {
    sortState,
    onSortChange,
    columnWidths,
    onColumnResize,
    columns,
    draggableColumns,
    onColumnOrderChange,
    getStickyOffset,
    allowPinning,
    onColumnPinChange,
    draggingColumn,
  } = useTable();

  const columnDef = columns?.find((c) => c.key === sortKey);
  const resolvedAlign = align || columnDef?.align || "left";

  const isSortable = !!sortKey && !!onSortChange && columnDef?.sortable === true;
  const isSortedActive = isSortable && sortState?.key === sortKey;
  const stickyLeft = getStickyOffset(sortKey);
  const isPinned = stickyLeft !== undefined;

  const direction: "asc" | "desc" =
    isSortedActive && sortState?.direction === "desc" ? "desc" : "asc";

  const { handleResizeStart } = useColumnResize({
    columnKey: sortKey,
    columnWidths,
    onColumnResize,
  });

  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useColumnDND({
    columnKey: sortKey,
    isPinned,
    draggableColumns,
    columns,
    onColumnOrderChange,
  });

  const { handleSort, handleKeyDown } = useColumnSort({
    columnKey: sortKey,
    isSortable,
    isSortedActive,
    sortState,
    onSortChange,
  });

  const handlePinToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!sortKey || !onColumnPinChange) return;
    onColumnPinChange(sortKey, !isPinned);
  };

  const isPlaceholder = draggingColumn === sortKey;

  return (
    <div
      className={clsx(
        "sui-table__cell",
        "sui-table__head-cell",
        `sui-table__cell--align-${resolvedAlign}`,
        isSortable && "is-sortable",
        isSortedActive && "is-sorted",
        isPinned && "is-sticky-column",
        isPinned && "is-pinned",
        allowPinning && "has-pinning-control",
        isPlaceholder && "is-placeholder",
        className
      )}
      style={{
        left: stickyLeft,
        zIndex: isPinned ? 20 : undefined,
      }}
      draggable={draggableColumns && !isPinned}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      role="columnheader"
      tabIndex={isSortable ? 0 : undefined}
      onClick={isSortable ? handleSort : undefined}
      onKeyDown={handleKeyDown}
      aria-sort={
        isSortable
          ? isSortedActive
            ? direction === "asc"
              ? "ascending"
              : "descending"
            : "none"
          : undefined
      }
    >
      {!isPlaceholder && (
        <>
          {/* DRAG HANDLE */}
          {draggableColumns && !isPinned && (
            <span className="sui-table__drag-handle">
              <MdDragIndicator />
            </span>
          )}

          {/* PIN CONTROL */}
          {allowPinning && (
            <button
              className={clsx(
                "sui-table__pin-control",
                isPinned && "is-pinned-active"
              )}
              onClick={handlePinToggle}
              title={isPinned ? "Unpin column" : "Pin column"}
            >
              {isPinned ? <MdPushPin /> : <MdOutlinePushPin />}
            </button>
          )}

          {/* LABEL */}
          <span className="sui-table__head-content">{children}</span>

          {/* SORT ICON */}
          {isSortedActive && (
            <span className="sui-table__sort-indicator">
              {sortIcon ? sortIcon(direction) : direction === "asc" ? "↑" : "↓"}
            </span>
          )}
        </>
      )}

      {/* RESIZE HANDLE */}
      {sortKey && onColumnResize && (
        <span
          className="sui-table__resize-handle"
          onMouseDown={handleResizeStart}
          draggable={false}
          onDragStart={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
};

export default TableHeadCell;
