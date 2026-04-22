import { useCallback, useState } from "react";
import type { IFilters } from "../components/FiltersSidebar/FiltersSidebar";

export const useFilters = (initialFilters: IFilters) => {
  const [filters, setFilters] = useState(initialFilters);

  const isEqual = <T>(a: T, b: T) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((v, i) => v === b[i]);
    }
    return a === b;
  };

  const updateFilter = useCallback(
    <K extends keyof IFilters>(key: K, value: IFilters[K]) => {
      setFilters((prev) => {
        if (isEqual(prev[key], value)) return prev;
        return { ...prev, [key]: value };
      });
    },
    [],
  );

  return { filters, updateFilter };
};
