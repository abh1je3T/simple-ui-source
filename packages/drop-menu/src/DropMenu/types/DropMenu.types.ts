import React from "react";
/** Options accepted by the useDropMenu hook (no children) */
export interface UseDropMenuOptions {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contextMode?: boolean;
}

/** Props for the DropMenu root component */
export interface DropMenuProps extends UseDropMenuOptions {
  children: React.ReactNode;
}

export interface DropMenuItemProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export interface DropMenuTriggerProps {
  children?: React.ReactNode;
}

export interface DropMenuContentProps {
  children: React.ReactNode;
  className?: string;
}
