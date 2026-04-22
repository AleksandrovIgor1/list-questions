import type { ComplexityItem } from "../FiltersSidebar/FiltersSidebar";
import styles from "./styles.module.css";


interface ComplexityProps {
  complexities: ComplexityItem[];
  selected: number[];
  onChange: (value: number[]) => void;
}

export const Complexity = ({ complexities, selected, onChange }: ComplexityProps) => {
  if (!complexities?.length) return [];

  const toggle = (values: number[]) => {
    const allSelected = values.every((v) => selected.includes(v))

    const updated = allSelected
      ? selected.filter((v) => !values.includes(v))
      : [...new Set([...selected, ...values])];

    onChange(updated);
  };

  return (
    <div className={styles.complexity}>
      <h4 className={styles.title}>Уровень сложности</h4>
      <div className={styles.options}>
        {complexities.map((item) => {
          const active = item.value.every((v) => selected.includes(v))

          return (
            <div
              key={item.label}
              className={`${styles.item} ${active ? styles.itemActive : ""
                }`}
              onClick={() => toggle(item.value)}
            >
              {item.label}
            </div>
          )
        }
        )}
      </div>
    </div>
  );
};
