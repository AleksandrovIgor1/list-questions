import styles from "./styles.module.css";
import { useState, useRef, useEffect, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Question } from "../../api/types";
import { RichText } from "../RichText/RichText";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Icon } from "../../icons/Icon";

interface QuestionItemProps {
  question: Question;
  currentPage: number;
}

export const QuestionItem = ({ question, currentPage }: QuestionItemProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/questions/${question.id}?page=${currentPage}`);
    setIsMenuOpen(false);
  };

  const toggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsMenuOpen((prev) => !prev);
  };

  const handleOpen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight =
          contentRef.current.scrollHeight + "px";
      } else {
        contentRef.current.style.maxHeight = "0px";
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [currentPage]);

  return (
    <div className={styles.item}>
      <div
        className={`${styles.body} ${isOpen ? styles.bodyOpen : ""}`}
        onClick={handleOpen}
      >
        <h2 className={styles.title}>
          <Icon name="ellipse" />
          {question.title}
        </h2>
        <Icon name="answer-toggle" className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`} />
      </div>
      <div ref={contentRef} className={styles.answerBody}>
        <div className={styles.indicatorsContainer}>
          <div className={styles.indicators}>
            <div className={styles.rating}>
              <span className={styles.ratingLabel}>Рейтинг:</span>
              <span className={styles.ratingBadge}>{question.rate}</span>
            </div>
            <div className={styles.complexity}>
              <span className={styles.complexityLabel}>Сложность: </span>
              <span className={styles.complexityBadge}>
                {question.complexity}
              </span>
            </div>
          </div>
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className={styles.moreOptions}
          >
            <Icon name="more-options"
              height={20}
              width={20}
              className={styles.moreOptionsIcon} />
          </button>
        </div>
        <img loading="lazy" src={question.imageSrc} alt={question.title} />
        <RichText content={question.shortAnswer} />
        <button className={styles.detailsButton} onClick={handleNavigate}>
          Подробнее
          <Icon name="detailsArrow" />
        </button>
      </div>
      {isMenuOpen && (
        <DropdownMenu
          handleNavigate={handleNavigate}
          isMenuOpen={isMenuOpen}
          buttonRef={buttonRef}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
    </div>
  );
};
