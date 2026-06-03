import { Progress } from '../../ui/Progress/Progress';
import styles from './styles.module.css'
interface InterviewProgressProps {
    current: number;
    total: number;

}

export const InterviewProgress = ({ current, total }: InterviewProgressProps) => {
    return (
        <section className={styles.progressSection}>
            <div className={styles.headerProgress}>
                <h2 className={styles.title}>
                    Вопросы собеседования
                </h2>

                <span className={styles.questionsCountDesktop}>
                    {`${current + 1}/${total}`}
                </span>
            </div>
            <Progress
                value={current + 1}
                max={total}
            />

            <span className={styles.questionsCountMobile}>
                {`${current + 1}/${total}`}
            </span>
        </section>
    )
}