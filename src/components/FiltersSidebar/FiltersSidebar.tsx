import styles from "./styles.module.css";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import type { ISkills, ISpecializations } from "../../api/types";
import { Complexity } from "../Complexity/Complexity";
import { Search } from "../Search/Search";
import { Skills } from "../Skills/Skills";
import { Status } from "../Status/Status";
import { Rate } from "../Rate/Rate";
import { Specializations } from "../Specializations/Specializations";
import { Icon } from "../../icons/Icon";

export interface IFilters {
  search: string;
  skills: number[];
  specialization: number | null;
  rate: number[];
  complexity: number[];
  status: string | null;
}


export interface ComplexityItem {
  label: string;
  value: number[];
}

interface FiltersSidebarProps {
  filters: IFilters;
  updateFilter: <K extends keyof IFilters>(key: K, value: IFilters[K]) => void;
  specializations: ISpecializations[];
  skills: ISkills[];
  isFiltersOpen: boolean;
  toggleFilters: () => void;
}

export const FiltersSidebar = ({
  filters,
  updateFilter,
  specializations,
  skills,
  isFiltersOpen,
  toggleFilters,
}: FiltersSidebarProps) => {
  const complexities: ComplexityItem[] = [
    { label: "1-3", value: [1, 2, 3] },
    { label: "4-6", value: [4, 5, 6] },
    { label: "7-8", value: [7, 8] },
    { label: "9-10", value: [9, 10] },
  ];
  const rate = [1, 2, 3, 4, 5];

  const filtersSidebarRef = useRef(null);

  useClickOutside([filtersSidebarRef], toggleFilters, isFiltersOpen);

  return (
    <aside
      ref={filtersSidebarRef}
      className={`${styles.filtersSidebar} ${isFiltersOpen ? styles.filtersSidebarOpen : ""}`}
    >
      {isFiltersOpen && (
        <Icon name="hide-filters-sidebar" className={styles.closeFilters}
          onClick={toggleFilters}
          width={20}
          height={20} />
      )}
      <Search value={filters.search} onChange={(value) => updateFilter("search", value)} />
      <Specializations
        specializations={specializations}
        selected={filters.specialization}
        onChange={(value) => updateFilter("specialization", value)}
      />
      <Skills
        skills={skills}
        selected={filters.skills}

        onChange={(value) => updateFilter("skills", value)}
      />
      <Complexity
        complexities={complexities}
        selected={filters.complexity}
        onChange={(value) => updateFilter("complexity", value)}
      />
      <Rate rate={rate} selected={filters.rate} onChange={(value) => updateFilter("rate", value)} />
      <Status options={["Изученные", "Не изученные", "Все"]} />
    </aside>
  );
};
