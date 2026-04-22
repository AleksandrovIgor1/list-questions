import { useQuestion } from "../../hooks/useQuestion";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { usePaginationQuestion } from "../../hooks/usePaginationQuestion";
import { useMemo, useState } from "react";
import { QuestionFilter } from "../../components/QuestionFilter/QuestionFilter";
import { GuruCard } from "../../components/GuruCard/GuruCard";
import { QuestionBody } from "../../components/QuestionBody/QuestionBody";
import { Icon } from "../../icons/Icon";

export const Question = () => {
  const { id } = useParams<{ id: string }>();

  const questionId = useMemo(() => {
    const num = Number(id);
    return Number.isNaN(num) ? null : num;
  }, [id]);

  const navigate = useNavigate();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setIsFiltersOpen((prev) => !prev);
  };

  const navigateToQuestions = () => {
    navigate("/questions");
  };

  const { data: question, loading, error } = useQuestion({ id: questionId ?? 0 });

  const { nextPage, prevPage } = usePaginationQuestion(questionId ?? 0);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!question) return <div>Not found</div>;

  return (
    <div className={styles.questionWrapper}>
      <div className={styles.contentContainer}>
        <button
          type="button"
          className={styles.back}
          onClick={navigateToQuestions}
        >
          <Icon name="arrow-back" />
          <span className={styles.backTitle}>Назад</span>
        </button>
        <div className={styles.question}>
          <QuestionBody
            isFiltersOpen={isFiltersOpen}
            toggleFilters={toggleFilters}
            prevPage={prevPage}
            nextPage={nextPage}
            question={question}
          />
          <div className={styles.sidebar}>
            <QuestionFilter
              isFiltersOpen={isFiltersOpen}
              toggleFilters={toggleFilters}
              question={question || null}
            />
            <GuruCard />
          </div>
        </div>
      </div>
    </div>
  );
};