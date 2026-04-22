import styles from "./styles.module.css";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRef } from "react";
import type { Question } from "../../api/types";
import { Icon } from "../../icons/Icon";

interface QuestionFilterProps {
  question: Question;
  toggleFilters: () => void;
  isFiltersOpen: boolean;
}

export const QuestionFilter = ({ question, toggleFilters, isFiltersOpen }: QuestionFilterProps) => {
  const filtersSidebarRef = useRef<HTMLDivElement | null>(null);

  useClickOutside([filtersSidebarRef], toggleFilters, isFiltersOpen);

  return (
    <div
      ref={filtersSidebarRef}
      className={`${styles.filter} ${isFiltersOpen ? styles.filterOpen : ""}`}
    >
      {isFiltersOpen && (
        <Icon name="hide-filters-sidebar" className={styles.closeFilters}
          onClick={toggleFilters}
          width={20}
          height={20} />
      )}
      <div className={styles.level}>
        <h4 className={styles.title}>Уровень:</h4>
        <div className={styles.options}>
          <div className={styles.rating}>
            <span className={styles.ratingLabel}>Рейтинг:</span>
            <span className={styles.ratingBadge}>{question.rate}</span>
          </div>
          <div className={styles.complexity}>
            <span className={styles.complexityLabel}>Сложность: </span>
            <span className={styles.complexityBadge}>
              {question.complexity}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.skills}>
        <h4 className={styles.title}>Навыки:</h4>
        <div className={styles.skillsOptions}>
          {question?.questionSkills?.map((skill) => (
            <div key={skill.id} className={styles.skillItem}>
              <Icon name="defaultSkill"
                className={styles.icon} />
              <span>{skill.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.keywords}>
        <h4 className={styles.title}>Ключевые слова:</h4>
        <div className={styles.skillsOptions}>
          {question?.keywords?.map((keyword) => (
            <span key={keyword} className={styles.keywordItem}>
              #{keyword}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.author}>
        <span>Автор: </span>
        <span className={styles.authorUsername}>
          {question?.createdBy?.username}
        </span>
      </div>
    </div>
  );
};


