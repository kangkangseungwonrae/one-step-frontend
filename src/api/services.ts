// api/profile.ts
import { api } from '@/api/axios';

export interface Profile {
  categories: string[];
  keywords: string[];
  locale: 'ko' | 'en';
  onboarding: boolean;
}

export const getProfile = async (): Promise<Profile> => {
  const { data } = await api.get('/profile'); // 또는 '/user/me'
  return data;
};
