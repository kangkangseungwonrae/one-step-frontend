import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/api/services';

import type { Profile } from '@/api/profile/dto';

export const useGetProfile = () => {
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 10, // 10분간 fresh
    gcTime: 1000 * 60 * 60, // 1시간 캐시
    refetchOnWindowFocus: false, // 탭 전환 시 refetch 안 함
    retry: false,
    throwOnError: false,
  });
};
