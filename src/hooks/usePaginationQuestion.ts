import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuestions } from "./useQuestions";

export const usePaginationQuestion = (id: number) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const { data: questions } = useQuestions({ currentPage });

  const questionsList = questions?.data ?? [];

  const totalPages = useMemo(() => {
    if (!questions?.total) return 1;
    return Math.max(
      1,
      Math.ceil((questions?.total || 0) / (questions?.limit || 10)),
    );
  }, [questions?.total, questions?.limit]);

  const currentIndex = questionsList.findIndex((q) => q.id === id);

  const directionRef = useRef<"prev" | "next" | null>(null);

  const navigateTo = useCallback(
    (targetId: number, page: number) => {
      const params = new URLSearchParams();

      if (Number(page) > 1) {
        params.set("page", String(page));
      }

      const search = params.toString() ? `?${params.toString()}` : "";

      navigate(`/questions/${targetId}${search}`);
    },
    [navigate],
  );

  const nextPage = useCallback(() => {
    if (questionsList.length === 0) return;

    if (currentIndex >= 0 && currentIndex < questionsList.length - 1) {
      navigateTo(questionsList[currentIndex + 1].id, currentPage);
      return;
    }

    if (currentPage < totalPages) {
      directionRef.current = "next";
      navigateTo(id, currentPage + 1);
    }
  }, [questionsList, currentIndex, currentPage, totalPages, id, navigateTo]);

  const prevPage = useCallback(() => {
    if (questionsList.length === 0) return;

    if (currentIndex > 0) {
      navigateTo(questionsList[currentIndex - 1].id, currentPage);
      return;
    }

    if (currentPage > 1) {
      directionRef.current = "prev";
      navigateTo(id, currentPage - 1);
    }
  }, [questionsList, currentIndex, currentPage, id, navigateTo]);

  useEffect(() => {
    if (questionsList.length === 0) return;

    if (questionsList.some((q) => q.id === id)) return;

    let targetId;

    if (directionRef.current === "prev") {
      targetId = questionsList[questionsList.length - 1]?.id;
    } else {
      targetId = questionsList[0]?.id;
    }

    if (targetId !== undefined) {
      navigateTo(targetId, currentPage);
    }

    directionRef.current = null;
  }, [questionsList, id, currentPage, navigateTo]);

  return {
    nextPage,
    prevPage,
  };
};
