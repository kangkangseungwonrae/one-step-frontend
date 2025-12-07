import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/api/queries/auth/useAuth';
import { useGetProfile } from '@/api/queries/profile';

export default function ProtectedRoute() {
  const { i18n } = useTranslation();
  const { data: isAuthenticated, isError } = useAuth();
  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile?.locale) {
      i18n.changeLanguage(profile.locale);
    }
  }, [profile?.locale, i18n]);

  if (isError || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
