import { useSuspenseQuery } from '@tanstack/react-query';

import { getAuth } from '../../services';

export const useAuth = () => {
  return useSuspenseQuery<boolean>({
    queryKey: ['auth-status'],
    queryFn: getAuth,
    staleTime: 1000 * 60 * 15, // 15분간 fresh
    gcTime: 1000 * 60 * 15,
    retry: false,
  });
};
