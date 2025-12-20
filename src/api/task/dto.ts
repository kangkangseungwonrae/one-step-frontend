export type Task = {
  id: number;
  description: string;
  duration: number;
  keywords: { name: string }[];
  categories: { name: string }[];
  icon: { name: string };
};

// Request DTOs
export interface GetCompleteTaskDto {
  date: string;
}

export interface GetCompleteTaskCountDto {
  from: string;
  to: string;
}

export interface PostCompleteTaskDto {
  taskId: number;
  completedAt: string;
  duration: number;
}

// Response DTO
export interface CompletedTask {
  id: number;
  completedAt: string;
  duration: number;
  task: Task;
}

export interface CompleteTaskCountDto {
  total: number;
  calendar: { date: string; count: number }[];
}

export interface FollowingQuestionDto {
  id: number;
  question: string;
  keywords: { id: number; name: string }[];
  categories: { name: string }[];
}

export interface PostFollowingQuestionDto {
  followingQuestionId: number;
  keywordIds: number[];
  completedAt: string;
}
