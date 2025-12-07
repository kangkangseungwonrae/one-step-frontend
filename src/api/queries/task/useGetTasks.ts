import { useSuspenseQuery } from '@tanstack/react-query';

import { getTasks } from '@/api/services';

export interface TasksParams {
  limit?: number;
  categories?: string[];
  keywords?: string[];
}

export const useGetTasks = (params: TasksParams) => {
  return useSuspenseQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(params),
  });
};
