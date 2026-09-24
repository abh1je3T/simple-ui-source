import React from "react";
import clsx from "clsx";
import { useTable } from "../context/TableContext";

type Props = {
  children: React.ReactNode;

  /** optional column key for width mapping */
  columnKey?: string;

  /** manual width override (Phase 3C fallback support) */
  width?: number | string;

  /** header vs body cell differentiation */
  variant?: "head" | "body";

  className?: string;
};

const TableCell: React.FC<Props & { align?: "left" | "center" | "right" }> = ({
  children,
  columnKey,
  variant = "body",
  className,
  align,
}) => {
  const { columns, getStickyOffset, draggingColumn } = useTable();

  const columnDef = columns?.find((c) => c.key === columnKey);
  const resolvedAlign = align || columnDef?.align || "left";


  const stickyLeft = getStickyOffset(columnKey);
  const isPinned = stickyLeft !== undefined;
  
  const isPlaceholder = draggingColumn === columnKey;

  return (
    <div
      className={clsx(
        "sui-table__cell",
        `sui-table__cell--${variant}`,
        `sui-table__cell--align-${resolvedAlign}`,
        isPinned && "is-sticky-column",
        isPlaceholder && "is-placeholder",
        className,
      )}
      role="cell"
      style={{
        left: stickyLeft,
      }}
      data-column-key={columnKey}
    >
      {!isPlaceholder && children}
    </div>
  );
};

export default TableCell;
