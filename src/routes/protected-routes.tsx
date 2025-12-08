import { useEffect, useEffectEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/api/queries/auth/useAuth';
import { useGetProfile } from '@/api/queries/profile';

export default function ProtectedRoute() {
  const { i18n } = useTranslation();
  const { data: isAuthenticated, isError } = useAuth();
  const { data: profile } = useGetProfile();

  const changeLocaleEffect = useEffectEvent((locale: string) => {
    i18n.changeLanguage(locale);
  });

  useEffect(() => {
    if (profile?.locale) {
      changeLocaleEffect(profile.locale);
    }
  }, [profile?.locale]);

  if (isError || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
