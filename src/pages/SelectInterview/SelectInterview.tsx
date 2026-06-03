import styles from "./styles.module.css";
import { Icon } from "../../icons/Icon";
import {
  useGetSkillsQuery,
  useGetSpecializationsQuery,
} from "../../store/api/filtersApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tooltip } from "../../ui/Tooltip/Tooltip";
import { SpecializationsInterview } from "../../components/SpecializationsInterview/SpecializationsInterview";
import { SkillsInterview } from "../../components/SkillsInterview/SkillsInterview";

const SelectInterview = () => {
  const navigate = useNavigate();

  const [selectedSpecializationId, setSelectedSpecializationId] =
    useState<number | null>(null);

  const modes = ["Повторение", "Только новые", "Случайные"];

  const complexities = ["1-3", "4-6", "7-8", "9-10"];

  const { data: specializations } = useGetSpecializationsQuery();
  const { data: skills } = useGetSkillsQuery();

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <div className={styles.layout}>
          <h1 className={styles.title}>Собеседование</h1>
          <div className={styles.content}>
            <div className={styles.leftOptions}>
              <SpecializationsInterview selectedId={selectedSpecializationId} items={specializations} onSelect={setSelectedSpecializationId} />
              <SkillsInterview items={skills} />
            </div>

            <div className={styles.rightOptionsWrapper}>
              <div className={styles.rightOptions}>
                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>
                    Уровень сложности
                  </h4>

                  <div className={styles.tags}>
                    {complexities.map((complexity, i) => (
                      <Tooltip key={i}>
                        <button
                          className={styles.tagButtonDisabled}
                        >
                          {complexity}
                        </button>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>
                    Выберите режим
                  </h4>

                  <div className={styles.tags}>
                    {modes.map((mode, i) => (
                      <Tooltip key={i}>
                        <button
                          className={styles.tagButtonDisabled}
                        >

                          {mode}
                        </button>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className={styles.counterSection}>
                  <h4 className={styles.sectionTitle}>
                    Количество вопросов
                  </h4>
                  <Tooltip>
                    <button className={styles.counterButton}>
                      <Icon name="decrement" />
                      35
                      <Icon name="increment" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={!selectedSpecializationId}
          onClick={() =>
            navigate(`/interview/${selectedSpecializationId}`)
          }
          className={styles.startButton}
        >
          Начать
          <Icon name="begin-arrow" />
        </button>
      </section>
    </div>
  );
};

export default SelectInterview;