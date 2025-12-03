import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getProfile, updateProfile } from '../services';

import type { UpdateProfileDto } from './dto';

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 10, // 10분간 fresh
    gcTime: 1000 * 60 * 60, // 1시간 캐시
    refetchOnWindowFocus: false, // 탭 전환 시 refetch 안 함
  });
};

export const usePatchProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (patch: UpdateProfileDto) => updateProfile(patch),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['profile'], updatedProfile);
    },
  });

  return mutation;
};
