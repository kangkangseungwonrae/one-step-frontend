export type Task = {
  description: string;
  duration: number;
  keywords: { name: string }[];
  categories: { name: string }[];
  icon: { name: string };
};
