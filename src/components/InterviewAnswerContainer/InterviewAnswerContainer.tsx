
import { Icon } from '../../icons/Icon';
import type { AnswerStatus } from '../../store/api/types';
import styles from './styles.module.css'
interface InterviewAnswerContainerProps {
    currentAnswer?: AnswerStatus;
    onAnswer: (status: AnswerStatus) => void;
    className?: string;

}

export const InterviewAnswerContainer = ({ currentAnswer, onAnswer, className }: InterviewAnswerContainerProps) => {
    return (
        <div className={className}>
            <button
                onClick={() => onAnswer('UNKNOWN')}
                className={`${styles.dontKnowButton} ${currentAnswer === 'UNKNOWN'
                    ? styles.dontKnowButtonActive
                    : ''
                    }`}
            >
                <Icon name='thumbs-down' className={styles.thumbsDownIcon} />
                <span className={styles.dontKnowTitle}>Не знаю</span>
            </button>

            <button
                onClick={() => onAnswer('KNOWN')}
                className={`${styles.knowButton} ${currentAnswer === 'KNOWN'
                    ? styles.knowButtonActive
                    : ''
                    }`}
            >
                <Icon name='thumbs-up' className={styles.thumbsUpIcon} />
                <span className={styles.knowTitle}>Знаю</span>
            </button>
        </div>
    )
}