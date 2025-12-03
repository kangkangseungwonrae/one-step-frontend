// api/profile.ts
import { api } from '@/api/axios';

import type { Profile, UpdateProfileDto } from './profile/dto';
import type { TasksParams } from './queries/useGetTasks';
import type { Task } from './task/dto';
import type { AxiosResponse } from 'axios';

export const logout = async (): Promise<AxiosResponse> => {
  const response = await api.post('/auth/logout');
  return response;
};

export const getAuth = async (): Promise<{ authenticated: boolean }> => {
  const { data } = await api.get('/auth/status');
  return data;
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
  const query = [
    `limit=${limit}`,
    ...categories.map((c) => `categories=${encodeURIComponent(c)}`),
    ...keywords.map((k) => `keywords=${encodeURIComponent(k)}`),
  ].join('&');

  const { data } = await api.get(`task?${query}`);
  return data.tasks;
};
