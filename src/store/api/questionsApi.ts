import { PAGE_SIZE } from "../../constants/constants";
import baseApi from "./baseApi";
import type { Question, PublicQueryParams, QuestionsResponse } from "./types";

interface QuestionFilters {
  skills?: number[];
  specialization?: number | null;
  rate?: number[];
  complexity?: number[];
}

interface GetQuestionsArgs {
  filters?: QuestionFilters;
  currentPage: number;
  search?: string;
}

export const buildPublicQuery = ({
  filters = {},
  currentPage,
  search,
}: GetQuestionsArgs): PublicQueryParams => {
  const params: PublicQueryParams = {
    page: currentPage,
    limit: PAGE_SIZE,
  };

  if (search?.trim()) {
    params.titleOrDescription = search.trim();
  }

  if (filters.specialization != null) {
    params.specializationId = filters.specialization;
  }

  if (filters.skills?.length) {
    params.skills = filters.skills.join(",");
  }

  if (filters.complexity?.length) {
    params.complexity = filters.complexity.join(",");
  }

  if (filters.rate?.length) {
    params.rate = filters.rate.join(",");
  }

  return params;
};

const questionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<QuestionsResponse, GetQuestionsArgs>({
      query: ({ filters, currentPage, search }) => ({
        url: "questions/public-questions",
        params: buildPublicQuery({ filters, currentPage, search }),
      }),
      providesTags: ["Question"],
    }),
    getQuestionById: builder.query<Question, number>({
      query: (id) => ({
        url: `questions/public-questions/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Question", id }],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useLazyGetQuestionsQuery,
  useGetQuestionByIdQuery,
} = questionsApi;
export default questionsApi;
