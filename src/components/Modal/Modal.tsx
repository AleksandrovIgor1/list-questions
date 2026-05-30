import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';
import styles from "./styles.module.css";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        createPortal(
            <div className={styles.overlay} onClick={onClose}>
                <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>, document.body
        )
    )
}
