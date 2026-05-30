import { Icon } from "../../icons/Icon";
import styles from "./styles.module.css";


interface StatisticsModalProps {
  open: boolean;
  onClose: () => void;
  skillsStats: Record<string, {
    total: number;
    known: number;
  }>
}

export const StatisticsModal = ({ open, onClose, skillsStats }: StatisticsModalProps) => {

  if (!open) return;

  return (
    <div className={styles.modalWrapper}>
      <Icon onClick={onClose} name="statistics-modal-close" />
      <div className={styles.modalContainer}>
        <div className={styles.left}>
          <div className={styles.leftHeader}>
            <Icon name="statistics-modal-grow" />
            <h2 className={styles.leftTitle}>Станьте членом сообщества</h2>
          </div>
          <p className={styles.leftInfo}>Хотите видеть весь свой прогресс? С подпиской вы получите доступ ко всем метрикам:</p>
          <ul className={styles.advantagesList}>
            <li className={styles.advantage}><Icon name="modal-check" /><span className={styles.advantagesTitle}>Полный доступ к тренажёру</span></li>
            <li className={styles.advantage}><Icon name="modal-check" /><span className={styles.advantagesTitle}>Умный режим повторения вопросов</span></li>
            <li className={styles.advantage}><Icon name="modal-check" /><span className={styles.advantagesTitle}>Детальная статистика прогресса</span></li>
            <li className={styles.advantage}><Icon name="modal-check" /><span className={styles.advantagesTitle}>Закрытые собесы топовых компаний</span></li>
          </ul>
          <button className={styles.becomeMemberButton}>Стать участником</button>
          <span className={styles.promotionTitle}>7 дней бесплатно</span>
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.rightContainer}>
            <div className={styles.rightHeader}>
              <h3 className={styles.rightTitle}>Прогресс</h3>
              <div className={styles.progressContainer}>
                <span className={styles.learnedQuestionsTitle}>Пройдено 3 из 3 вопрос изучен!</span>
                <div className={styles.learnedAllProgressBar}>
                  <div className={styles.segmentLeft} />
                  <div className={styles.segmentCenter} />
                  <div className={styles.segmentRight} />
                </div>
              </div>
            </div>
            <div className={styles.skillsList}>
              {Object.entries(skillsStats).map(([skill, stats]) => {

                const progress =
                  stats.total > 0
                    ? (stats.known / stats.total) * 100
                    : 0;

                return (
                  <div key={skill} className={styles.skillItem}>

                    <div className={styles.skillHeader}>
                      <span className={styles.skillTitle}>{skill}</span>

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
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
