import { useRef, useEffect } from "react";
import { ColumnWidthMap } from "../types";
import { useTable } from "../context/TableContext";

interface UseColumnResizeProps {
  columnKey?: string;
  columnWidths?: ColumnWidthMap;
  onColumnResize?: (next: ColumnWidthMap) => void;
}

export const useColumnResize = ({
  columnKey,
  columnWidths,
  onColumnResize,
}: UseColumnResizeProps) => {
  const { setResizingColumn } = useTable();
  const startX = useRef(0);
  const startWidth = useRef(0);

  // Keep track of latest props to avoid stale closures in event listeners
  const propsRef = useRef({ columnKey, columnWidths, onColumnResize });
  useEffect(() => {
    propsRef.current = { columnKey, columnWidths, onColumnResize };
  }, [columnKey, columnWidths, onColumnResize]);

  const handleResizeStart = (e: React.MouseEvent) => {
    const {
      columnKey: key,
      columnWidths: widths,
      onColumnResize: callback,
    } = propsRef.current;
    if (!key || !callback) return;

    e.preventDefault();
    e.stopPropagation();

    const currentWidth =
      typeof widths?.[key] === "number"
        ? widths[key]
        : (e.currentTarget.parentElement as HTMLElement).offsetWidth;

    startX.current = e.clientX;
    startWidth.current = Number(currentWidth);

    setResizingColumn?.(key);

    const handleMouseMove = (event: MouseEvent) => {
      const {
        columnKey: k,
        columnWidths: w,
        onColumnResize: cb,
      } = propsRef.current;
      if (!k || !cb) return;

      const diff = event.clientX - startX.current;
      const newWidth = Math.max(80, startWidth.current + diff);

      cb({
        ...w,
        [k]: newWidth,
      });
    };

    const handleMouseUp = () => {
      setResizingColumn?.(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return { handleResizeStart };
};
