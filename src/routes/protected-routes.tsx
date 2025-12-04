import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/api/queries/useAuth';

export default function ProtectedRoute() {
  const { data: isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
