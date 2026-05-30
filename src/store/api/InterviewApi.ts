import baseApi from "./baseApi";
import type { IInterview } from "./types";

interface InterviewParams {
  specialization: number;
}

const interviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInterview: builder.query<IInterview, InterviewParams>({
      query: ({ specialization }) => ({
        url: "/interview-preparation/quizzes/mock/new",
        params: { specialization },
      }),
    }),
  }),
});

export const { useGetInterviewQuery } = interviewApi;
export default interviewApi;
