import { useState, useCallback, KeyboardEvent } from "react";
import { DropdownOption } from "../types";

/**
 * Hook to manage keyboard navigation (arrows, enter, space, esc, tab) for the dropdown.
 */
export const useKeyboardNavigation = (
  isOpen: boolean,
  setIsOpen: (open: boolean) => void,
  flatOptions: DropdownOption[],
  handleSelect: (option: DropdownOption) => void,
  disabled?: boolean,
  loading?: boolean,
) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled || loading) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex > -1) {
          handleSelect(flatOptions[focusedIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < flatOptions.length - 1 ? prev + 1 : prev,
          );
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(flatOptions.length - 1);
        } else {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "Tab") {
        setIsOpen(false);
      }
    },
    [disabled, loading, isOpen, focusedIndex, flatOptions, handleSelect, setIsOpen],
  );

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
  };
};
