export type Profile = {
  categories: string[];
  image: string;
  keywords: string[];
  locale: 'ko' | 'en';
  name: string;
  onboarding: boolean;
};

export type UpdateProfileDto = Partial<Profile>;
