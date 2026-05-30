import baseApi from "./baseApi";
import type {
  ISkills,
  ISpecializations,
  SkillsResponse,
  SpecializationsResponse,
} from "./types";

const filtersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecializations: builder.query<ISpecializations[], void>({
      query: () => "/specializations",
      transformResponse: (
        response: SpecializationsResponse,
      ): ISpecializations[] => response.data,
      providesTags: ["Filter"],
    }),
    getSkills: builder.query<ISkills[], void>({
      query: () => "/skills",
      transformResponse: (response: SkillsResponse): ISkills[] => response.data,
      providesTags: ["Filter"],
    }),
  }),
});

export const { useGetSpecializationsQuery, useGetSkillsQuery } = filtersApi;
export default filtersApi;
