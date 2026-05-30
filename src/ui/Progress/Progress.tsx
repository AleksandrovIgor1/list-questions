import styles from './styles.module.css';
interface ProgressProps {
    value: number;
    max?: number;
}
export const Progress = ({ value, max = 100 }: ProgressProps) => {
    const percentage = (value / max) * 100;
    return (
        <div className={styles.progress}>
            <div className={styles.value} style={{ width: `${percentage}%` }} />
        </div>
    )
}
