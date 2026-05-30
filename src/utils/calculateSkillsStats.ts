import type { AnswerStatus, IQuestion } from "../store/api/types";

export const calculateSkillsStats = (
  questions: IQuestion[],
  answers: Record<number, AnswerStatus>,
) => {
  const skillsStats: Record<
    string,
    {
      total: number;
      known: number;
    }
  > = {};

  questions.forEach((question) => {
    question.questionSkills.forEach((skill) => {
      const skillTitle = skill.title;

      if (!skillsStats[skillTitle]) {
        skillsStats[skillTitle] = {
          total: 0,
          known: 0,
        };
      }

      skillsStats[skillTitle].total += 1;

      if (answers[question.id] === "KNOWN") {
        skillsStats[skillTitle].known += 1;
      }
    });
  });

  return skillsStats;
};
