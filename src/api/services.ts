// api/profile.ts
import { api } from '@/api/axios';

import type { Profile, UpdateProfileDto } from './profile/dto';
import type { TasksParams } from './queries/task/useGetTasks';
import type { CompletedTask, GetCompleteTaskDto, PostCompleteTaskDto, Task } from './task/dto';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

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
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      return false;
    }
    throw error;
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
