// api/profile.ts
import { api } from '@/api/axios';

import type { Profile, UpdateProfileDto } from './profile/dto';
import type { TasksParams } from './queries/task/useGetTasks';
import type {
  CompletedTask,
  CompleteTaskCountDto,
  FollowingQuestionDto,
  GetCompleteTaskCountDto,
  GetCompleteTaskDto,
  PostCompleteTaskDto,
  PostFollowingQuestionDto,
  Task,
} from './task/dto';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export const logout = async (): Promise<AxiosResponse> => {
  const response = await api.post('/auth/logout', {}, {
    _skipInterceptor: true,
  } as AxiosRequestConfig);
  return response;
};

export const getAuth = async (): Promise<boolean> => {
  try {
    const { data } = await api.get<{ authenticated: boolean }>('/auth');
    return data.authenticated;
  } catch {
    return false;
  }
};

export const getProfile = async (): Promise<Profile> => {
  const { data } = await api.get('/profile'); // 또는 '/user/me'
  return data;
};

export const updateProfile = async (profile: UpdateProfileDto): Promise<Profile> => {
  const { data } = await api.patch('/profile', profile);
  return data;
};

export const getTasks = async ({ limit, categories, keywords }: TasksParams): Promise<Task[]> => {
  const params = new URLSearchParams();
  params.append('limit', limit?.toString() || '10');

  categories?.forEach((c) => params.append('categories', c));
  keywords?.forEach((k) => params.append('keywords', k));

  const { data } = await api.get(`task?${params.toString()}`);
  return data.tasks;
};

// * Completed Task API

export const getCompleteTasks = async ({ date }: GetCompleteTaskDto): Promise<CompletedTask[]> => {
  const { data } = await api.get('/completed-tasks', {
    params: {
      date,
    },
  });
  return data.completedTasks;
};

export const postCompleteTask = async (body: PostCompleteTaskDto) => {
  const response = await api.post('/completed-tasks', body);
  return response;
};

export const getCompleteTaskCount = async ({ from, to }: GetCompleteTaskCountDto): Promise<CompleteTaskCountDto> => {
  const { data } = await api.get('/completed-tasks/calendar', {
    params: {
      from,
      to,
    },
  });
  return data;
};

// * Following Question API

export const getFollowingQuestion = async ({
  categories,
}: {
  categories?: string[];
}): Promise<FollowingQuestionDto> => {
  const params = new URLSearchParams();
  categories?.forEach((c) => params.append('categories', c));
  const { data } = await api.get(`/following-question?${params.toString()}`);
  return data;
};

export const postFollowingQuestion = async (body: PostFollowingQuestionDto) => {
  const response = await api.post('/completed-following-questions', body);
  return response;
};
