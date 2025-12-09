import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfile } from '@/api/services';

import type { UpdateProfileDto } from '@/api/profile/dto';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (patch: UpdateProfileDto) => updateProfile(patch),
    onSuccess: (updatedProfile) => queryClient.setQueryData(['profile'], updatedProfile),
  });

  return mutation;
};
