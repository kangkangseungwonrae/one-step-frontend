import { useSuspenseQuery } from '@tanstack/react-query';

import { getAuth } from '../../services';

export const useAuth = () => {
  return useSuspenseQuery<boolean>({
    queryKey: ['auth-status'],
    queryFn: getAuth,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};
