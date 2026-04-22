export interface User {
  id: string;
  username: string;
}

export interface ISpecializations {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ISkills {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  specializations: ISpecializations[];
  currentPage?: number;
}

export interface Question {
  id: number;
  title: string;
  slug: string;
  description: string;
  code: string | null;
  imageSrc: string | undefined;
  keywords: string[];
  longAnswer: string;
  shortAnswer: string;
  status: string;
  rate: number;
  complexity: number;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;

  createdBy: User;
  updatedBy: User;

  questionSpecializations: ISpecializations[];
  questionSkills: ISkills[];
}

export interface QuestionsResponse {
  data: Question[];
  total: number;
  limit: number;
  page: number;
}

export interface PublicQueryParams {
  page: number;
  limit: number;
  titleOrDescription?: string;
  specializationId?: number;
  skills?: string;
  complexity?: string;
  rate?: string;
}
