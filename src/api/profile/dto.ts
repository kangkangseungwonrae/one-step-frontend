export type Profile = {
  categories: string[];
  image: string;
  keywords: string[];
  locale: string;
  name: string;
  onboarding: boolean;
};

export type UpdateProfileDto = Partial<Profile>;
