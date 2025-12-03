export type Keyword = {
  name: string;
};

export type Category = {
  name: string;
};

export type Task = {
  descritpion: string;
  duration: number;
  keywords: Keyword[];
  categories: Category[];
};
