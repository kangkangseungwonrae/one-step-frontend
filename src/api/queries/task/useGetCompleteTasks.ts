import { useQuery } from '@tanstack/react-query';

import { getCompleteTasks } from '@/api/services';

import type { GetCompleteTaskDto } from '@/api/task/dto';

export interface TasksParams {
  limit: number;
  categories?: string[];
  keywords?: string[];
}

export const useGetCompletedTasks = ({ date }: GetCompleteTaskDto) => {
  return useQuery({
    queryKey: ['completed-tasks', date],
    queryFn: () => getCompleteTasks({ date }),
    staleTime: 0,
    gcTime: 1000 * 60 * 60, // 1시간 캐시
    refetchOnWindowFocus: false, // 탭 전환 시 refetch 안 함
  });
};
