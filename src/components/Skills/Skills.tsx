import styles from "./styles.module.css";
import type { ISkills } from "../../api/types";
import { Expandable } from "../Expandable/Expandable";
import { Icon } from "../../icons/Icon";

interface SkillsProps {
  skills: ISkills[];
  selected: number[];
  onChange: (value: number[]) => void;
}

export const Skills = ({ skills, selected, onChange }: SkillsProps) => {
  if (!skills?.length) return null;

  const toggle = (id: number) => {
    let updated: number[];

    if (selected?.includes(id)) {
      updated = selected.filter((item) => item !== id);
    } else {
      updated = [...selected, id];
    }

    onChange(updated);
  };

  return (
    <div className={styles.skills}>
      <h4 className={styles.title}>Навыки</h4>
      <Expandable
        items={skills}
        initialCount={5}
        className={styles.skillsOptions}
        buttonClassName={styles.allOptions}
      >
        {(visibleSkills) => {
          return visibleSkills.map((skill) => {
            return (
              <div
                key={skill.id}
                className={`${styles.skillItem} ${selected?.includes(skill.id) ? styles.skillItemActive : ""}`}
                onClick={() => toggle(skill.id)}
              >
                <Icon name="defaultSkill" />

                <span>{skill.title}</span>
              </div>
            );
          });
        }}
      </Expandable>
    </div>
  );
};
