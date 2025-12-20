import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postFollowingQuestion } from '@/api/services';

import type { PostFollowingQuestionDto } from '@/api/task/dto';

export const usePostFollowingQuestion = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: PostFollowingQuestionDto) => postFollowingQuestion(body),
    onSuccess: () => {
      // profile도 업데이트 (스트릭 등)
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return mutation;
};
