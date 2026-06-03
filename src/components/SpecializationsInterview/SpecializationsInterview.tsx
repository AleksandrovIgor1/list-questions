import styles from "./styles.module.css";
import type { ISpecializations } from "../../store/api/types";

interface SpecializationsInterviewProps {
    items: ISpecializations[] | undefined;
    selectedId: number | null;
    onSelect: (id: number) => void;
}

export const SpecializationsInterview = ({ items, selectedId, onSelect }: SpecializationsInterviewProps) => {

    return (
        <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
                Выбор специализации
            </h4>

            <div className={styles.tags}>
                {items?.map((specialization) => (
                    <button
                        key={specialization.id}
                        onClick={() =>
                            onSelect(
                                specialization.id
                            )
                        }
                        className={`${styles.tagButton} ${selectedId ===
                            specialization.id
                            ? styles.tagButtonActive
                            : ""
                            }`}
                    >
                        {specialization.title}
                    </button>
                ))}
            </div>
        </div>)
};