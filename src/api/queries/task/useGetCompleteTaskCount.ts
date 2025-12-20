import { useQuery } from '@tanstack/react-query';

import { getCompleteTaskCount } from '@/api/services';

import type { GetCompleteTaskCountDto } from '@/api/task/dto';

export const useGetCompleteTaskCount = ({ from, to }: GetCompleteTaskCountDto) => {
  return useQuery({
    queryKey: ['completed-tasks', from, to],
    queryFn: () => getCompleteTaskCount({ from, to }),
    staleTime: 0,
    gcTime: 1000 * 60 * 60, // 1시간 캐시
    refetchOnWindowFocus: false, // 탭 전환 시 refetch 안 함
  });
};
