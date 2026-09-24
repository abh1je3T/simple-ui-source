import React from "react";
import clsx from "clsx";
import { useTable } from "../context/TableContext";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TableHead: React.FC<Props> = ({ children, className }) => {
  const { appearance, sticky } = useTable();

  return (
    <div
      className={clsx(
        "sui-table__head",
        `sui-table__head--${appearance}`,
        sticky?.header && "is-sticky-header",
        className,
      )}
      role="rowgroup"
    >
      {children}
    </div>
  );
};

export default TableHead;
