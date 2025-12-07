import { useSuspenseQuery } from '@tanstack/react-query';

import { getTasks } from '@/api/services';

export interface TasksParams {
  limit?: number;
  categories?: string[];
  keywords?: string[];
}

export const useGetTasks = (params: TasksParams) => {
  return useSuspenseQuery({
    queryKey: ['tasks', params],
    queryFn: () => getTasks(params),
    staleTime: 0,
    gcTime: 1000 * 60 * 60, // 1시간 캐시
    refetchOnWindowFocus: false, // 탭 전환 시 refetch 안 함
  });
};
