import { useState, useRef, useEffect, useCallback } from "react";
import { UseDropMenuOptions } from "../types/DropMenu.types";

export function useDropMenu({
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  contextMode
}: UseDropMenuOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const next = typeof value === "function" ? value(open) : value;
      if (setControlledOpen) {
        setControlledOpen(next);
      } else {
        setUncontrolledOpen(next);
      }
    },
    [open, setControlledOpen],
  );

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);


  const registerItem = useCallback((el: HTMLElement | null, index: number) => {
    itemsRef.current[index] = el;
  }, []);

  // Reset on close and clear stale refs so next open starts fresh
  useEffect(() => {
    if (!open) {
      setActiveIndex(-1);
      itemsRef.current = [];
    }
  }, [open]);

  // Handle dynamic items (filtering)
  const itemsCount = itemsRef.current.filter(Boolean).length;
  useEffect(() => {
    if (open && activeIndex >= itemsCount) {
      setActiveIndex(itemsCount > 0 ? 0 : -1);
    }
  }, [itemsCount, open, activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const items = itemsRef.current.filter(Boolean);
      if (!items.length) return;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1 >= items.length ? 0 : prev + 1));
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 < 0 ? items.length - 1 : prev - 1));
          break;
        }
        case "Enter": {
          const targetIndex = activeIndex === -1 ? 0 : activeIndex;
          const item = items[targetIndex];

          if (item) {
            // Only prevent default if we're actually clicking something manually
            // or if we're preventing a form submission on selection
            if (document.activeElement !== item) {
              e.preventDefault();
              item.click();
            }
          }
          break;
        }
        case "Escape":
          setOpen(false);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, activeIndex, setOpen]);

  // Click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: Event) => {
      const content = contentRef.current;
      const trigger = triggerRef.current;

      if (!content || !trigger) return;

      if (
        !content.contains(e.target as Node) &&
        !trigger.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open, setOpen]);

  // Context Menu Mode Logic
  useEffect(() => {
    if (!contextMode) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      if (triggerRef.current) {
        // Move trigger to mouse position
        Object.assign(triggerRef.current.style, {
          position: "fixed",
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
          width: "1px",
          height: "1px",
          opacity: "0",
          pointerEvents: "none",
        });
      }

      setOpen(true);
    };

    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, [contextMode, setOpen]);

  return {
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    triggerRef,
    contentRef,
    itemsRef,
    registerItem,
  };
}
