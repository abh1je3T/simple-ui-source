import { TableColumn } from "../types";
import { useTable } from "../context/TableContext";

interface UseColumnDNDProps {
  columnKey?: string;
  isPinned: boolean;
  draggableColumns?: boolean;
  columns?: TableColumn[];
  onColumnOrderChange?: (keys: string[]) => void;
}

export const useColumnDND = ({
  columnKey,
  isPinned,
  draggableColumns,
  columns,
  onColumnOrderChange,
}: UseColumnDNDProps) => {
  const { draggingColumn, setDraggingColumn } = useTable();

  const handleDragStart = (e: React.DragEvent) => {
    // Prevent drag if clicking on the resize handle or if pinned
    const target = e.target as HTMLElement;
    if (target.classList.contains("sui-table__resize-handle") || isPinned) {
      e.preventDefault();
      return;
    }

    if (!draggableColumns || !columnKey || !setDraggingColumn) return;

    // Use a small timeout to allow the browser to capture the ghost image
    // before we apply the placeholder styles that might hide it.
    setTimeout(() => {
      setDraggingColumn(columnKey);
    }, 0);

    e.dataTransfer.setData("columnKey", columnKey);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (
      !draggableColumns ||
      isPinned ||
      !draggingColumn ||
      !columns ||
      !onColumnOrderChange ||
      !columnKey
    ) {
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (draggingColumn === columnKey) {
      return;
    }

    const currentKeys = columns.map((c) => c.key);
    const fromIndex = currentKeys.indexOf(draggingColumn);
    const toIndex = currentKeys.indexOf(columnKey);

    if (fromIndex !== -1 && toIndex !== -1) {
      const nextKeys = [...currentKeys];
      nextKeys.splice(fromIndex, 1);
      nextKeys.splice(toIndex, 0, draggingColumn);
      onColumnOrderChange(nextKeys);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (setDraggingColumn) setDraggingColumn(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (setDraggingColumn) setDraggingColumn(null);
  };

  return { handleDragStart, handleDragOver, handleDrop, handleDragEnd };
};
