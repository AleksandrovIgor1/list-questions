import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AnswerStatus } from "../api/types";

export interface InterviewState {
  answers: Record<number, AnswerStatus>;
}

const initialState: InterviewState = {
  answers: {},
};

export const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{ questionId: number; status: AnswerStatus }>,
    ) => {
      state.answers[action.payload.questionId] = action.payload.status;
    },
  },
});

export const { setAnswer } = interviewSlice.actions;
export default interviewSlice.reducer;
