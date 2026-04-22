import { createPortal } from "react-dom";
import styles from "./styles.module.css";
import { useCallback, useRef, type Dispatch, type RefObject, type SetStateAction } from "react";
import { useDropdownPosition } from "../../hooks/useDropdownPosition";
import { useClickOutside } from "../../hooks/useClickOutside";

interface DropdownMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  buttonRef: RefObject<HTMLButtonElement | null>;
  handleNavigate: () => void;
}

export const DropdownMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  buttonRef,
  handleNavigate,
}: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const position = useDropdownPosition(isMenuOpen, buttonRef);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [setIsMenuOpen])

  useClickOutside([dropdownRef, buttonRef], closeMenu, isMenuOpen)

  if (!position) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      className={styles.dropdown}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        transform: "translateX(-100%)",
        zIndex: 1000,
        width: 160,
      }}
    >
      <button className={styles.detail} onClick={handleNavigate}>
        Подробнее
      </button>
    </div>,
    document.body,
  );
};