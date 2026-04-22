import { api } from "./axios";
import { PAGE_SIZE } from "../constants/constants";
import type { PublicQueryParams, Question, QuestionsResponse } from "./types";

interface QuestionFilters {
  skills?: number[];
  specialization?: number | null;
  rate?: number[];
  complexity?: number[];
}

interface BuildPublicQueryParams {
  filters?: QuestionFilters;
  page: number;
  search?: string;
}

export const buildPublicQuery = ({
  filters = {},
  page,
  search,
}: BuildPublicQueryParams): PublicQueryParams => {
  const params: PublicQueryParams = {
    page,
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

export const questionsApi = {
  async getPublic({
    params,
    signal,
  }: {
    params: PublicQueryParams;
    signal?: AbortSignal;
  }): Promise<QuestionsResponse> {
    const response = await api.get<QuestionsResponse>(
      "questions/public-questions",
      {
        params,
        signal,
      },
    );

    return response.data;
  },

  async getById(id?: number, signal?: AbortSignal): Promise<Question> {
    const response = await api.get(`questions/public-questions/${id}`, {
      signal,
    });

    return response.data;
  },
};
