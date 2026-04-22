import { useEffect, useState } from "react";
import { questionsApi } from "../api/questions.api";
import type { Question } from "../api/types";

interface QuestionParams {
  id?: number;
}

interface UseQuestionsResult {
  data: Question | null;
  loading: boolean;
  error: string | null;
}

export const useQuestion = ({ id }: QuestionParams): UseQuestionsResult => {
  const [data, setData] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === undefined) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const fetchQuestion = async () => {
      if (!data) setLoading(true);
      setError(null);

      try {
        const result = await questionsApi.getById(id, controller.signal);

        setData(result);
      } catch (err) {
        if (err instanceof Error && err.name !== "CanceledError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();

    return () => {
      controller.abort();
    };
  }, [id]);

  return { data, loading, error };
};
