import styles from "./styles.module.css";
import type { PageAction } from "../../hooks/usePaginationQuestions";
import type { MouseEventHandler } from "react";
import { Icon } from "../../icons/Icon";

interface PaginationProps {
  pages: (number | '...')[];
  currentPage: number;
  changePage: (type: PageAction, page?: number) => MouseEventHandler<HTMLButtonElement>;
  total: number;
}

export const Pagination = ({ pages, currentPage, changePage, total }: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.iconButton}
        disabled={currentPage <= 1}
        onClick={changePage("prev")}
      >
        <Icon name="prev-pagination" />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`}>
            <Icon name="bread-crumbs" className={styles.breadCrumbs} />
          </span>
        ) : (
          <button
            key={page}
            className={`${styles.page} ${page === currentPage ? styles.pageActive : ""
              }`}
            onClick={changePage("set", page)}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={styles.iconButton}
        disabled={currentPage >= total}
        onClick={changePage("next")}
      >

        <Icon name="next-pagination" />
      </button>
    </div>
  );
};
