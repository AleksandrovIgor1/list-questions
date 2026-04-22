import guruIcon from "../../icons/guru-question-filter.svg";
import { Icon } from "../../icons/Icon";

import styles from "./styles.module.css";

export const GuruCard = () => {
  return (
    <div className={styles.guru}>
      <div className={styles.guruCard}>
        <img src={guruIcon} />
        <div className={styles.guruInfo}>
          <p className={styles.guruUsername}>Руслан Куянец</p>
          <p className={styles.guruSpecialization}>Python Guru</p>
        </div>
      </div>
      <p>Guru – это эксперты YeaHub, которые помогают развивать комьюнити.</p>
      <div className={styles.guruIcons}>
        <Icon name="telegram-guru" />
        <Icon name="youtube-guru" />
        <Icon name="profile-guru" />
      </div>
    </div>
  );
};


