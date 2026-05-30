import type { AnswerStatus, IQuestion } from "../store/api/types";

export const calculateInterviewStats = (
  questions: IQuestion[],
  answers: Record<number, AnswerStatus>,
) => {
  const questionIds = questions?.map((q) => q.id) ?? [];

  const currentAnswers = Object.entries(answers).filter(([questionId]) =>
    questionIds.includes(Number(questionId)),
  );

  const answersArray = currentAnswers.map(([, value]) => value);

  const total = questions.length ?? 0;
  const unknown = answersArray.filter((answer) => answer === "UNKNOWN").length;
  const known = answersArray.filter((answer) => answer === "KNOWN").length;

  const answeredQuestions = answersArray.length;

  const progress = total > 0 ? Math.round((known / total) * 100) : 0;

  return {
    total,
    known,
    unknown,
    answeredQuestions,
    newQuestions: total - answeredQuestions,
    progress,
  };
};
