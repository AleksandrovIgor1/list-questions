import { useState } from "react";
import styles from "./styles.module.css";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { RichText } from "../RichText/RichText";
import type { Question } from "../../api/types";
import { Icon } from "../../icons/Icon";

interface QuestionBodyProps {
  nextPage: () => void,
  prevPage: () => void,
  question: Question,
  toggleFilters: () => void,
  isFiltersOpen: boolean,
}

export const QuestionBody = ({
  nextPage,
  prevPage,
  question,
  toggleFilters,
  isFiltersOpen,
}: QuestionBodyProps) => {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  const handleAnswerToggle = () => {
    setIsAnswerOpen((prev) => !prev);
  };

  useLockBodyScroll(isFiltersOpen);

  return (
    <div className={styles.questionWrapper}>
      <div className={styles.questionHeaderWrapper}>
        <img
          className={styles.image}
          src={question.imageSrc}
          alt={question.title}
        />
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <h1 className={styles.infoTitle}>{question.title}</h1>
            <Icon name="filter-button-question"
              className={styles.filterButtonQuestion}
              onClick={toggleFilters} />
          </div>
          <p className={styles.description}>{question.description}</p>
        </div>
      </div>
      <div className={styles.navButtons}>
        <button className={styles.prevButton} onClick={prevPage}>
          <Icon name="prev-question-arrow" />
          Предыдущий
        </button>
        <button className={styles.nextButton} onClick={nextPage}>
          Следующий
          <Icon name="next-question-arrow" />
        </button>
      </div>
      <div className={styles.shortAnswer}>
        <h2 className={styles.shortAnswerTitle}>Краткий ответ</h2>
        <RichText content={question.shortAnswer} />
      </div>
      <div className={styles.longAnswerWrapper}>
        <div
          className={`${styles.longAnswerContent} ${isAnswerOpen ? styles.longAnswerContentOpen : ""}`}
        >
          <h2 className={styles.longAnswerTitle}>Длинный ответ</h2>
          <RichText content={question.longAnswer} />
        </div>
        <button className={styles.unwrap} onClick={handleAnswerToggle}>
          <span>{isAnswerOpen ? "Свернуть" : "Развернуть"}</span>
          <Icon name="answer-toggle" className={`${styles.arrow} ${isAnswerOpen ? styles.arrowOpen : ""}`} />
        </button>
      </div>
    </div>
  );
};