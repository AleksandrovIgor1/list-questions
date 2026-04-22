import styles from "./styles.module.css";

interface RateProps {
  rate: number[];
  selected: number[];
  onChange: (value: number[]) => void;
}

export const Rate = ({ rate, selected, onChange }: RateProps) => {
  const toggle = (item: number) => {
    let updated: number[];
    if (selected.includes(item)) {
      updated = selected.filter((selectedItem) => selectedItem != item);
    } else {
      updated = [...selected, item];
    }

    onChange(updated);
  };

  return (
    <div className={styles.rate}>
      <h4 className={styles.title}>Рейтинг вопроса</h4>

      <div className={styles.rateOptions}>
        {rate.map((item) => (
          <div
            key={item}
            className={`${styles.rateItem} ${selected.includes(item) ? styles.rateItemActive : ""
              }`}
            onClick={() => toggle(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};