import { useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useGetQuestionsQuery,
  useLazyGetQuestionsQuery,
} from "../store/api/questionsApi";
import type { Question } from "../store/api/types";

export const usePaginationQuestion = (id: number) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [loadQuestions] = useLazyGetQuestionsQuery();
  const { data: questions } = useGetQuestionsQuery({ currentPage });

  const questionsList = useMemo(() => questions?.data ?? [], [questions?.data]);

  const totalPages = Math.max(
    1,
    Math.ceil((questions?.total || 0) / (questions?.limit || 10)),
  );

  const currentIndex = questionsList.findIndex((q: Question) => q.id === id);

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

  const nextPage = useCallback(async () => {
    if (questionsList.length === 0) return;

    if (currentIndex >= 0 && currentIndex < questionsList.length - 1) {
      navigateTo(questionsList[currentIndex + 1].id, currentPage);
      return;
    }

    if (currentPage < totalPages) {
      try {
        const response = await loadQuestions({
          currentPage: currentPage + 1,
        }).unwrap();

        const firstQuestion = response.data[0];

        if (firstQuestion) {
          navigateTo(firstQuestion.id, currentPage + 1);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [
    questionsList,
    currentIndex,
    currentPage,
    totalPages,
    navigateTo,
    loadQuestions,
  ]);

  const prevPage = useCallback(async () => {
    if (questionsList.length === 0) return;

    if (currentIndex > 0) {
      navigateTo(questionsList[currentIndex - 1].id, currentPage);
      return;
    }

    if (currentPage > 1) {
      try {
        const response = await loadQuestions({
          currentPage: currentPage - 1,
        }).unwrap();

        const prevQuestions = response.data;
        const lastQuestion = prevQuestions[prevQuestions.length - 1];

        if (lastQuestion) {
          navigateTo(lastQuestion.id, currentPage - 1);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [questionsList, currentIndex, currentPage, navigateTo, loadQuestions]);

  return {
    nextPage,
    prevPage,
  };
};
