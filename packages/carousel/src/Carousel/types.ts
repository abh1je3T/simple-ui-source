import { ReactNode } from "react";

export type CarouselVariant = "buttons" | "auto" | "center";

export interface CarouselProps {
  children: ReactNode;
  variant?: CarouselVariant;
  visibleItems?: number;
  gap?: string;
  autoPlaySpeed?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  showButtons?: boolean;
  showDots?: boolean;
  scaleOnHover?: boolean;
  className?: string;
}
