import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/api/services';

import type { Profile } from '@/api/profile/dto';

export const useGetProfile = () => {
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 10,
    retry: false, // 인터셉터가 재시도를 담당하므로 쿼리 자체 재시도는 불필요
  });
};
