import { useEffect, useState } from "react";

export type TransitionPhase = "enter" | "enter-active" | "exit" | "exit-active";

interface Options {
  open: boolean;
  duration?: number;
}

export function useTransitionState({ open, duration = 200 }: Options) {
  const [mounted, setMounted] = useState(open);
  const [phase, setPhase] = useState<TransitionPhase>("enter");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (open) {
      setMounted(true);
      setPhase("enter");

      requestAnimationFrame(() => {
        setPhase("enter-active");
      });
    } else if (mounted) {
      setPhase("exit");

      requestAnimationFrame(() => {
        setPhase("exit-active");
      });

      timer = setTimeout(() => {
        setMounted(false);
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [open, mounted, duration]);

  return {
    mounted,
    phase,
  };
}
