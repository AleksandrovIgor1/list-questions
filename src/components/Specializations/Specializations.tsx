import type { ISpecializations } from "../../api/types";
import { Expandable } from "../Expandable/Expandable";
import styles from "./styles.module.css";

interface SpecializationsProps {
  specializations: ISpecializations[];
  selected: number | null;
  onChange: (value: number | null) => void;
}

export const Specializations = ({ specializations, selected, onChange }: SpecializationsProps) => {
  if (!specializations.length) return [];

  const toggle = (id: number) => {
    onChange(selected == id ? null : id)
  };

  if (!specializations.length) return null;

  return (
    <div className={styles.specializations}>
      <h4 className={styles.title}>Специализация</h4>
      <div className={styles.specializationOptions}>
        <Expandable
          items={specializations}
          initialCount={5}
          className={styles.specializationOptions}
          buttonClassName={styles.allOptions}
        >
          {(visibleSpecializations) => {
            return visibleSpecializations.map((specialization) => {
              return (
                <div
                  key={specialization.id}
                  className={`${styles.specializationItem} ${selected === specialization.id ? styles.specializationItemActive : ""}`}
                  onClick={() => toggle(specialization.id)}
                >
                  {specialization.title}
                </div>
              );
            });
          }}
        </Expandable>
      </div>
    </div>
  );
};
