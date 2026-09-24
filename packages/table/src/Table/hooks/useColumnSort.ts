import { TableSortState } from "../types";

interface UseColumnSortProps {
  columnKey?: string;
  isSortable: boolean;
  isSortedActive: boolean;
  sortState?: TableSortState;
  onSortChange?: (state: TableSortState) => void;
}

export const useColumnSort = ({
  columnKey,
  isSortable,
  isSortedActive,
  sortState,
  onSortChange,
}: UseColumnSortProps) => {
  const handleSort = () => {
    if (!isSortable || !columnKey) return;

    const nextDirection =
      isSortedActive && sortState?.direction === "asc" ? "desc" : "asc";

    onSortChange?.({
      key: columnKey,
      direction: nextDirection,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSortable) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSort();
    }
  };

  return { handleSort, handleKeyDown };
};
