import styles from "./styles.module.css";
import type { ISkill } from "../../store/api/types";
import { Tooltip } from "../../ui/Tooltip/Tooltip";

interface SkillsInterviewProps {
    items: ISkill[] | undefined
}

export const SkillsInterview = ({ items }: SkillsInterviewProps) => {

    return (
        <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
                Категории вопросов
            </h4>
            <div className={styles.tags}>
                {items?.map((skill) => (
                    <Tooltip key={skill.id}>
                        <button
                            disabled
                            className={styles.tagButtonDisabled}
                        >
                            {skill.title}
                        </button>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
};