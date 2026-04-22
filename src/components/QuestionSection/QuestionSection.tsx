import styles from "./styles.module.css";
import { type Dispatch, type SetStateAction } from "react";
import { usePaginationQuestions } from "../../hooks/usePaginationQuestions";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import type { Question } from "../../api/types";
import { QuestionItem } from "../QuestionItem/QuestionItem";
import { Pagination } from "../Pagination/Pagination";
import { Icon } from "../../icons/Icon";

interface QuestionSectionProps {
  data: Question[],
  loading: boolean,
  error: string | null,
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  totalPages: number,
  isFiltersOpen: boolean,
  toggleFilters: () => void,
}

export const QuestionSection = ({
  data,
  loading,
  error,
  currentPage,
  setCurrentPage,
  totalPages,
  isFiltersOpen,
  toggleFilters,
}: QuestionSectionProps) => {
  const { pages, changePage } = usePaginationQuestions({
    total: totalPages,
    currentPage,
    onPageChange: setCurrentPage,
  });

  useLockBodyScroll(isFiltersOpen);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>Нет вопросов</div>;

  return (
    <section className={styles.questionSection}>
      <div className={styles.questionTitle}>
        <h1 className={styles.title}>Вопросы React, JavaScript</h1>
        <Icon className={styles.filterButton} name="filter-button-questions" onClick={toggleFilters} />
      </div>
      <div className={styles.questionList}>
        {data.map((question) => (
          <QuestionItem
            currentPage={currentPage}
            key={question.id}
            question={question}
          />
        ))}
      </div>
      <Pagination
        changePage={changePage}
        pages={pages}
        currentPage={currentPage}
        total={totalPages}
      />
    </section>
  );
};

