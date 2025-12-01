import { useQuery } from '@tanstack/react-query';

import { getTasks } from '@/api/services';

export interface TasksParams {
  limit: number;
  categories: string[];
  keywords: string[];
}

export const useGetTasks = (params: TasksParams) => {
  return useQuery({
    queryKey: ['tasks', params],
    queryFn: () => getTasks(params),
    staleTime: 1000 * 60 * 10, // 10분간 fresh
    gcTime: 1000 * 60 * 60, // 1시간 캐시
    refetchOnWindowFocus: false, // 탭 전환 시 refetch 안 함
  });
};
