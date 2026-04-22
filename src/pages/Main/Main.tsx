import styles from "./styles.module.css";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { useQuestions } from "../../hooks/useQuestions";
import { useFetch } from "../../hooks/useFetch";
import type { ISkills, ISpecializations } from "../../api/types";
import { QuestionSection } from "../../components/QuestionSection/QuestionSection";
import { FiltersSidebar } from "../../components/FiltersSidebar/FiltersSidebar";

export const Main = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setIsFiltersOpen((prev) => !prev);
  };

  const { filters, updateFilter } = useFilters({
    search: "",
    skills: [],
    specialization: null,
    rate: [],
    complexity: [],
    status: null,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const debouncedValue = useDebounce(filters.search, 1000);

  const { data, loading, error } = useQuestions({
    ...filters,
    search: debouncedValue,
    currentPage,
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  const { data: specializations } = useFetch<ISpecializations[]>("/specializations");
  const { data: skills } = useFetch<ISkills[]>("/skills");

  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedValue,
    filters.skills,
    filters.specialization,
    filters.rate,
    filters.complexity,
    filters.status,
  ]);

  return (
    <main className={styles.main}>
      <QuestionSection
        data={data?.data || []}
        loading={loading}
        error={error}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        isFiltersOpen={isFiltersOpen}
        toggleFilters={toggleFilters}
      />
      <FiltersSidebar
        isFiltersOpen={isFiltersOpen}
        toggleFilters={toggleFilters}
        specializations={specializations || []}
        skills={skills || []}
        filters={filters}
        updateFilter={updateFilter}
      />
    </main>
  );
};
