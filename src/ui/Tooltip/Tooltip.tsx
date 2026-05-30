import { useRef, useState, type ReactNode } from 'react'
import styles from './styles.module.css';

interface TooltipProps {
    children: ReactNode;
    tip?: string;
}

export const Tooltip = ({ children, tip = "Доступно только для зарегистрированных пользователей" }: TooltipProps) => {
    const triggerRef = useRef(null);
    const [opened, setOpened] = useState(false);
    const toggleTooltip = () => {
        setOpened(prev => !prev);

        setTimeout(() => {
            setOpened(false);
        }, 2000)
    }

    return (
        <div className={styles.wrapper} ref={triggerRef}
            onTouchStart={toggleTooltip}>
            {children}
            {opened && (
                <div className={styles.tooltip}>{tip}</div>
            )}
        </div>
    )
}
