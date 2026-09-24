import { createContext, useContext } from "react";

export interface DropMenuContextValue {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  itemsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  registerItem: (el: HTMLElement | null, index: number) => void;
}

export const DropMenuContext = createContext<DropMenuContextValue | null>(null);

export const useDropMenuContext = () => {
  const context = useContext(DropMenuContext);
  if (!context) {
    throw new Error("DropMenu compound components must be rendered within the DropMenu component");
  }
  return context;
};
