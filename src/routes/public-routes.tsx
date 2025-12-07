import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/api/queries/auth/useAuth';

export default function PublicRoutes() {
  const { data: isAuthenticated, isError } = useAuth();

  if (isError || isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
