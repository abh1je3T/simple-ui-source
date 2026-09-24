import { useCallback, useId, useRef, useState } from "react";
import {
  useFloating,
  offset,
  shift,
  flip,
  arrow,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useClientPoint,
} from "@floating-ui/react";

export interface UseTooltipOptions {
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
  followCursor?: boolean;
  disabled?: boolean;
}

export const useTooltip = ({
  placement = "top",
  delay = 150,
  followCursor = false,
  disabled = false,
}: UseTooltipOptions) => {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const tooltipId = useId();

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    strategy: "fixed", 
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { delay });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const clientPoint = useClientPoint(context, { enabled: followCursor });

  const {
    getReferenceProps: _getReferenceProps,
    getFloatingProps: _getFloatingProps,
  } = useInteractions([hover, focus, dismiss, role, clientPoint]);

  const getReferenceProps = useCallback(
    (userProps: React.HTMLProps<HTMLElement> = {}) =>
      _getReferenceProps({
        ...userProps,
        "aria-describedby": open ? tooltipId : undefined,
      }),
    [_getReferenceProps, open, tooltipId],
  );

  const getFloatingProps = useCallback(
    (userProps: React.HTMLProps<HTMLElement> = {}) =>
      _getFloatingProps({
        id: tooltipId,
        ...userProps,
      }),
    [_getFloatingProps, tooltipId],
  );
  return {
    open,
    refs,
    floatingStyles,
    middlewareData,
    arrowRef,
    getReferenceProps,
    getFloatingProps,
    disabled,
  };
};
