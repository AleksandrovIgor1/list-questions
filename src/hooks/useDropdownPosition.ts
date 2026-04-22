import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

type DropdownPosition = {
  top: number;
  left: number;
};

export const useDropdownPosition = (
  isOpen: boolean,
  buttonRef: RefObject<HTMLButtonElement | null>,
): DropdownPosition | null => {
  const [position, setPosition] = useState<DropdownPosition | null>(null);

  const frame = useRef<number | null>(null);

  const calculatePosition = useCallback(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + 6,
      left: rect.right,
    });
  }, [buttonRef]);

  const updatePosition = useCallback(() => {
    if (frame.current) return;

    frame.current = requestAnimationFrame(() => {
      calculatePosition();
      frame.current = null;
    });
  }, [calculatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    calculatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);

      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, [isOpen, calculatePosition, updatePosition]);

  return position;
};
