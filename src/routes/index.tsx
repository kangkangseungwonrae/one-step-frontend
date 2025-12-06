import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

const CalendarPage = lazy(() => import('@/pages/calendar'));
const LoginPage = lazy(() => import('@/pages/login'));
const MainPage = lazy(() => import('@/pages/main'));
const OnboardingPage = lazy(() => import('@/pages/onboarding'));
const SettingsPage = lazy(() => import('@/pages/settings'));
const ProtectedRoute = lazy(() => import('@/routes/protected-routes'));
const PublicRoutes = lazy(() => import('@/routes/public-routes'));

export const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [{ path: '/login', Component: LoginPage }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', Component: MainPage },
      { path: '/onboarding', Component: OnboardingPage },
      { path: '/calendar', Component: CalendarPage },
      { path: '/settings', Component: SettingsPage },
    ],
  },
]);
