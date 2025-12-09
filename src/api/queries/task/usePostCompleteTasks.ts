import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postCompleteTask } from '@/api/services';

import type { PostCompleteTaskDto } from '@/api/task/dto';

export const usePostCompleteTasks = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: PostCompleteTaskDto) => postCompleteTask(body),
    onSuccess: () => {
      // 완료된 task가 추가되었으므로 completed-tasks 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['completed-tasks'] });
      // profile도 업데이트 (스트릭 등)
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return mutation;
};
