
import type { ChangeEvent } from "react";
import styles from "./styles.module.css";
import { Icon } from "../../icons/Icon";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const Search = ({ value, onChange }: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  };

  return (
    <div className={styles.search}>
      <Icon name="search-icon" />
      <input
        onChange={handleChange}
        value={value}
        placeholder="Введите запрос..."
      />
    </div>
  );
};
