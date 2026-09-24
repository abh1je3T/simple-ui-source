import React from "react";
import clsx from "clsx";

export const TableBody: React.FC<any> = ({ children }) => {
  return <div className={clsx("sui-table__body")} role="rowgroup">{children}</div>;
};
