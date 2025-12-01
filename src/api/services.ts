// api/profile.ts
import { api } from '@/api/axios';

import type { AxiosResponse } from 'axios';

export interface Profile {
  categories: string[];
  keywords: string[];
  locale: 'ko' | 'en';
  onboarding: boolean;
}

export const logout = async (): Promise<AxiosResponse> => {
  const response = await api.post('/auth/logout');
  return response;
};

export const getProfile = async (): Promise<Profile> => {
  const { data } = await api.get('/profile'); // 또는 '/user/me'
  return data;
};
