import {
  useMemo,
  type Dispatch,
  type MouseEventHandler,
  type SetStateAction,
} from "react";

interface usePaginationQuestionsParams {
  total: number;
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}

export type PageAction = "set" | "next" | "prev";

export const usePaginationQuestions = ({
  total,
  currentPage,
  onPageChange,
}: usePaginationQuestionsParams) => {
  const pages = useMemo(() => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const startWindowSize = 3;
    const endWindowSize = 2;
    let start = currentPage - startWindowSize;
    let end = currentPage + endWindowSize;

    if (currentPage <= 4) {
      start = 1;
      end = 6;
    }

    if (currentPage >= total - 3) {
      start = total - 5;
      end = total;
    }

    const pages: (number | "...")[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total) {
      if (end < total - 1) pages.push("...");
      pages.push(total);
    }

    return pages;
  }, [total, currentPage]);

  const changePage = (
    type: PageAction,
    page?: number,
  ): MouseEventHandler<HTMLButtonElement> => {
    return function () {
      switch (type) {
        case "set":
          if (page !== undefined) {
            onPageChange(Math.max(1, Math.min(page, total)));
          }
          break;

        case "next":
          onPageChange((p) => Math.min(p + 1, total));
          break;

        case "prev":
          onPageChange((p) => Math.max(p - 1, 1));
          break;
      }
    };
  };

  return { pages, changePage };
};
