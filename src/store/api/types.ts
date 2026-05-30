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

export interface SpecializationsResponse {
  data: ISpecializations[];
}

export interface ISkills {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  specializations: ISpecializations[];
}

export interface SkillsResponse {
  data: ISkills[];
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

export interface ISkill {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
}

export interface IAnswer {
  questionId: number;
  questionTitle: string;
  answer: "KNOWN" | "UNKNOWN";
}

export interface IInterviewResponse {
  answers: IAnswer[];
}

export interface IQuestion {
  id: number;
  title: string;
  slug: string;
  description: string;
  code: string;
  imageSrc: string | null;
  keywords: string[];
  longAnswer: string;
  shortAnswer: string;
  status: string;
  rate: number;
  complexity: number;
  createdById: string;
  updatedById: string;
  questionSpecializations: ISpecializations[];
  questionSkills: ISkill[];
}

export interface IInterview {
  id: string;
  startDate: string;
  fullCount: number;
  skills: string[];
  response: IInterviewResponse;
  questions: IQuestion[];
}

export type AnswerStatus = "KNOWN" | "UNKNOWN";
