import { useEffect, useMemo, useState } from "react";
import { buildPublicQuery, questionsApi } from "../api/questions.api";
import type { QuestionsResponse } from "../api/types";

interface UseQuestionsProps {
  search?: string;
  skills?: number[];
  specialization?: number | null;
  rate?: number[];
  complexity?: number[];
  status?: string | null;
  currentPage?: number;
}

interface UseQuestionsResult {
  data: QuestionsResponse | null;
  loading: boolean;
  error: string | null;
}

export const useQuestions = (
  options: UseQuestionsProps,
): UseQuestionsResult => {
  const {
    search = "",
    skills = [],
    specialization = null,
    rate = [],
    complexity = [],
    status = null,
    currentPage = 1,
  } = options;
  const [data, setData] = useState<QuestionsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryParams = useMemo(() => {
    const filters = {
      ...(skills?.length ? { skills } : {}),
      ...(specialization != null ? { specialization } : {}),
      ...(rate?.length ? { rate } : {}),
      ...(complexity?.length ? { complexity } : {}),
      ...(status != null ? { status } : {}),
    };

    return buildPublicQuery({
      ...(Object.keys(filters).length ? { filters } : {}),
      page: currentPage,
      ...(search.trim() ? { search } : {}),
    });
  }, [search, skills, specialization, rate, complexity, status, currentPage]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuestions = async () => {
      if (!data) setLoading(true);
      setError(null);

      try {
        const result = await questionsApi.getPublic({
          params: queryParams,
          signal: controller.signal,
        });

        setData(result);
      } catch (err) {
        if (err instanceof Error && err.name !== "CanceledError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      controller.abort();
    };
  }, [queryParams]);

  return { data, loading, error };
};
