export type Profile = {
  categories: string[];
  image: string;
  keywords: string[];
  locale: 'ko' | 'en';
  name: '정현';
  onboarding: boolean;
};

export type UpdateProfileDto = Partial<Profile>;
