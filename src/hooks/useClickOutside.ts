import { useEffect, type RefObject } from "react";

export const useClickOutside = (
  refs: RefObject<HTMLElement | null>[],
  handler: () => void,
  enabled: boolean = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const clickOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node),
      );
      if (clickOutside) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler, enabled]);
};
