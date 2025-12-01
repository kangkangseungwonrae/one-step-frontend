// api/profile.ts
import { api } from '@/api/axios';

import type { TasksParams } from './queries/useGetTasks';
import type { AxiosResponse } from 'axios';

export interface Profile {
  categories: string[];
  keywords: string[];
  locale: 'ko' | 'en';
  onboarding: boolean;
}

interface Keyword {
  name: string;
}

interface Category {
  name: string;
}

export interface Task {
  descritpion: string;
  duration: number;
  keywords: Keyword[];
  categories: Category[];
}

export const logout = async (): Promise<AxiosResponse> => {
  const response = await api.post('/auth');
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

export const getTasks = async ({ limit, categories, keywords }: TasksParams): Promise<Task[]> => {
  const query = [
    `limit=${limit}`,
    ...categories.map((c) => `categories=${encodeURIComponent(c)}`),
    ...keywords.map((k) => `keywords=${encodeURIComponent(k)}`),
  ].join('&');

  const { data } = await api.get(`/tasks?${query}`);
  return data;
};
