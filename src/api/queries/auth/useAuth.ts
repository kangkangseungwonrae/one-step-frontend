import { useQuery } from '@tanstack/react-query';

import { getAuth } from '@/api/services';

export const useAuth = () => {
  return useQuery<boolean>({
    queryKey: ['auth-status'],
    queryFn: getAuth,
    staleTime: 1000 * 60 * 15, // 15분간 fresh
    retry: false, // 인증 실패 시 여러 번 재시도할 필요 없음
    throwOnError: false, // 에러를 던지지 않고 isError로 받음
  });
};
