import styles from "./styles.module.css";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { QuestionSection } from "../../components/QuestionSection/QuestionSection";
import { FiltersSidebar } from "../../components/FiltersSidebar/FiltersSidebar";
import { useGetQuestionsQuery } from "../../store/api/questionsApi";
import { useGetSkillsQuery, useGetSpecializationsQuery } from "../../store/api/filtersApi";

const Main = () => {
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

  const { data: questions, isLoading, error } = useGetQuestionsQuery({ filters, search: debouncedValue, currentPage })

  const totalPages = questions ? Math.max(1, Math.ceil(questions.total / questions.limit)) : 1

  const { data: specializations } = useGetSpecializationsQuery();

  const { data: skills } = useGetSkillsQuery();

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
        data={questions?.data ?? []}
        loading={isLoading}
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

export default Main