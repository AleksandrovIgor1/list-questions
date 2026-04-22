import { useState } from "react";
import styles from "./styles.module.css";

interface StatusProps {
  options: string[];
}

export const Status = ({ options }: StatusProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={styles.status}>
      <h4 className={styles.title}>Статус</h4>

      <div className={styles.statusOptions}>
        {options.map((item) => (
          <div
            key={item}
            className={`${styles.statusItem} ${selected === item ? styles.statusItemActive : ""
              }`}
            onClick={() => setSelected(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
