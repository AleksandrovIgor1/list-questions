import { useCallback, useRef, useState } from "react";
import styles from "./styles.module.css";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Icon } from "../../icons/Icon";
import { Link } from "react-router-dom";

export const Header = () => {

  const [isPreparationOpen, setIsPreparationOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const togglePreparation = useCallback(() => {
    setIsPreparationOpen((prev) => !prev);
  }, []);

  const closePreparation = useCallback(() => {
    setIsPreparationOpen(false)
  }, [])

  useClickOutside([wrapperRef], closePreparation, isPreparationOpen)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Icon name="yeahub-header" className={styles.logoDesktop} />
          <Icon name="yeahub-header-icon" className={styles.logoMobile} />
          <div className={styles.preparationWrapper} ref={wrapperRef}>
            <button
              onClick={togglePreparation}
              className={styles.preparationButton}
            >
              Подготовка <Icon name="preparation-toggle" />
            </button>
            <nav
              className={`${styles.dropdown} ${isPreparationOpen ? styles.dropdownOpen : ""}`}
            >
              <Link to='/questions'>База вопросов</Link>
              <Link to='/interview'>Тренажёр</Link>
              <Link to='/questions'>Материалы</Link>
              <Link to='/questions'>Навыки (hh)</Link>
            </nav>
          </div>
          <nav className={styles.nav}>
            <Link to='/questions'>База вопросов</Link>
            <Link to='/interview'>Тренажёр</Link>
            <Link to='/questions'>Материалы</Link>
            <Link to='/questions'>Навыки (hh)</Link>
          </nav>
        </div>
        <div className={styles.right}>
          <button className={styles.logIn}>Вход</button>
          <button className={styles.signIn}>Регистрация</button>
          <Icon name="hamburger-menu" className={styles.hamburgerMenu} />
        </div>
      </div>
    </header>
  );
};
