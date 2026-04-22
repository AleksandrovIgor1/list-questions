import styles from "./styles.module.css";

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h2>Страница не найдена!</h2>
      <a className={styles.back} href="/">
        Вернуться на главную
      </a>
    </div>
  );
};