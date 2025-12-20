import { useQuery } from '@tanstack/react-query';

import { getFollowingQuestion } from '@/api/services';

export const useGetFollowingQuestion = ({ categories }: { categories?: string[] }) => {
  return useQuery({
    queryKey: ['following-question'],
    queryFn: () => getFollowingQuestion({ categories }),
  });
};
