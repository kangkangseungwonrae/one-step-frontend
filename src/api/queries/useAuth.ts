import { useQuery } from '@tanstack/react-query';

import { getAuth } from '../services';

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth-status'],
    queryFn: getAuth,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};
