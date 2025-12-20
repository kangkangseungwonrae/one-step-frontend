import { useEffect } from 'react'; // useEffectEvent 대신 표준 방식 권장
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '@/api/queries/auth/useAuth';
import { useGetProfile } from '@/api/queries/profile';

export default function ProtectedRoute() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const { data: isAuthenticated, isLoading: isAuthLoading, isError } = useAuth();
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();

  useEffect(() => {
    if (profile?.locale && i18n.language !== profile.locale) {
      i18n.changeLanguage(profile.locale);
    }
  }, [profile?.locale]);

  if (isAuthLoading || isProfileLoading) {
    return null; // 또는 <LoadingSpinner />
  }

  // 3. 인증 실패 시 로그인으로
  if (isError || !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (profile?.onboarding && location.pathname === '/onboarding') {
    return <Navigate to="/" replace />;
  }

  if (!profile?.onboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
