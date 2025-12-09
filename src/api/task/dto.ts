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
