import { useParams } from 'react-router-dom'
import { Icon } from '../../icons/Icon'
import { useGetInterviewQuery } from '../../store/api/InterviewApi'
import { useAppSelector } from '../../store/hooks'
import { Circular } from '../../ui/Circular/Circular'
import styles from './styles.module.css'
import { calculateInterviewStats } from '../../utils/calculateInterviewStats'
import { calculateSkillsStats } from '../../utils/calculateSkillsStats'
import { useModal } from '../../hooks/useModal'
import { StatisticsModal } from '../../components/StatisticsModal/StatisticsModal'
import { Modal } from '../../components/Modal/Modal'

const Statistics = () => {
    const { id } = useParams();

    const specializationId = id
        ? Number(id)
        : undefined;

    const { data: interview } = useGetInterviewQuery(
        { specialization: specializationId! },
        { skip: specializationId === undefined }
    );

    const answers = useAppSelector(
        state => state.interview.answers
    );

    const stats = calculateInterviewStats(
        interview?.questions ?? [],
        answers
    );

    const skillsStats = calculateSkillsStats(
        interview?.questions ?? [],
        answers
    );

    const {
        showModal,
        openModal,
        closeModal
    } = useModal();

    return (
        <div className={styles.page}>
            <section className={styles.statisticsCard}>
                <div className={styles.statisticsHeader}>
                    <h2 className={styles.sectionTitle}>
                        Умный режим изучения вопросов
                    </h2>

                    <Modal
                        open={showModal}
                        onClose={closeModal}
                    >
                        <StatisticsModal
                            open={showModal}
                            onClose={closeModal}
                            skillsStats={skillsStats}
                        />
                    </Modal>

                    <span
                        className={styles.statisticsAction}
                        onClick={openModal}
                    >
                        Посмотреть статистику

                        <Icon name="show-statistics-arrow" />
                    </span>
                </div>

                <div className={styles.statisticsContent}>
                    <div className={styles.statsCard}>
                        <div className={styles.statsContent}>
                            <h2 className={styles.cardTitle}>
                                Статистика пройденных вопросов
                            </h2>

                            <div className={styles.statisticsChart}>
                                <Circular progress={stats.progress} />

                                <div className={styles.statisticsGrid}>
                                    <div className={styles.statItem}>
                                        <h4 className={styles.statLabel}>
                                            Всего
                                        </h4>

                                        <span className={styles.statValue}>
                                            {stats.total}
                                        </span>
                                    </div>

                                    <div className={styles.statItem}>
                                        <h4 className={styles.statLabel}>
                                            Новые
                                        </h4>

                                        <span className={styles.statValue}>
                                            {stats.newQuestions}
                                        </span>
                                    </div>

                                    <div className={styles.statItem}>
                                        <h4 className={styles.statLabel}>
                                            В процессе
                                        </h4>

                                        <span className={styles.statValue}>
                                            {stats.unknown}
                                        </span>
                                    </div>

                                    <div className={styles.statItem}>
                                        <h4 className={styles.statLabel}>
                                            Изучено
                                        </h4>

                                        <span className={styles.statValue}>
                                            {stats.known}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.skillsCard}>
                        <h2 className={styles.cardTitle}>
                            Прогресс обучения по навыкам
                        </h2>

                        <div className={styles.skillsList}>
                            {Object.entries(skillsStats).map(
                                ([skill, stats]) => {

                                    const progress =
                                        stats.total > 0
                                            ? (stats.known / stats.total) * 100
                                            : 0;

                                    return (
                                        <div
                                            key={skill}
                                            className={styles.skillItem}
                                        >
                                            <div className={styles.skillHeader}>
                                                <span className={styles.skillTitle}>
                                                    {skill}
                                                </span>

                                                <span className={styles.skillValue}>
                                                    {stats.known}/{stats.total}
                                                </span>
                                            </div>

                                            <div className={styles.progressBar}>
                                                <div
                                                    className={styles.progressFill}
                                                    style={{
                                                        width: `${progress}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <span
                        className={styles.statisticsActionMobile}
                        onClick={openModal}
                    >
                        Посмотреть статистику

                        <Icon name="show-statistics-arrow" />
                    </span>
                </div>
            </section>

            <section className={styles.questionsCard}>
                <h2 className={styles.sectionTitle}>
                    Список пройденных вопросов собеседования
                </h2>

                <div className={styles.questionsGrid}>
                    {interview?.response.answers.map(answer => (
                        <div
                            key={answer.questionId}
                            className={styles.questionCard}
                        >
                            <div className={styles.questionImage} />

                            <div className={styles.questionInfo}>
                                <h3 className={styles.questionTitle}>
                                    {answer.questionTitle}
                                </h3>

                                <button
                                    className={`
                                        ${styles.answerButton}
                                        ${answers[answer.questionId] === "KNOWN"
                                            ? styles.answerButtonKnown
                                            : styles.answerButtonUnknown
                                        }
                                    `}
                                >
                                    <Icon
                                        name={
                                            answers[answer.questionId] === "KNOWN"
                                                ? 'thumbs-up'
                                                : 'thumbs-down'
                                        }
                                    />

                                    <span>
                                        {
                                            answers[answer.questionId] === "KNOWN"
                                                ? 'Знаю'
                                                : 'Не знаю'
                                        }
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Statistics