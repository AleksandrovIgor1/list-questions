import { useState } from "react";
import type { IInterview } from "../store/api/types";

export const useInterviewNavigation = (interview: IInterview | undefined) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const currentQuestion = interview?.questions[currentQuestionIndex];

  const handlePrev = () => {
    if (currentQuestionIndex === 0) return;

    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!interview) return;

    const isLastQuestionIndex =
      currentQuestionIndex >= interview.questions.length - 1;

    if (isLastQuestionIndex) return;

    setCurrentQuestionIndex((prev) => prev + 1);
  };
  return { currentQuestion, currentQuestionIndex, handlePrev, handleNext };
};
