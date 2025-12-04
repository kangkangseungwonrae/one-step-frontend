import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/api/queries/useAuth';

export default function PublicRoutes() {
  const { data: isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
