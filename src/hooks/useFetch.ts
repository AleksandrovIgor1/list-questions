import { useEffect, useState } from "react";
import { api } from "../api/axios";

interface FetchResult<T> {
  data: T | null | undefined;
  isLoading: boolean;
  error: Error | null;
}

interface ApiResponse<T> {
  data: T;
}

export const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;
    let isMounted = true;

    const fetchData = async () => {
      setError(null);
      if (!data) setIsLoading(true);

      try {
        const result = await api.get<ApiResponse<T>>(url);
        if (isMounted) {
          setData(result.data.data);
        }
      } catch (err) {
        if (!isMounted) return;
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading, error };
};
