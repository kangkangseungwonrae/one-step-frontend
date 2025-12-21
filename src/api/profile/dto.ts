export type Profile = {
  categories: { name: string }[];
  image: string;
  keywords: { name: string }[];
  locale: string;
  name: string;
  onboarding: boolean;
};

export type UpdateProfileDto = Partial<{
  categories: string[];
  image: string;
  keywords: string[];
  locale: string;
  name: string;
  onboarding: boolean;
}>;
