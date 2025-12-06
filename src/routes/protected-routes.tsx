import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/api/queries/useAuth';

export default function ProtectedRoute() {
  const { data: isAuthenticated, isError } = useAuth();

  if (isError || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
