import { createBrowserRouter } from 'react-router';

import CalendarPage from '@/pages/calendar';
import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';
import OnboardingPage from '@/pages/onboarding';
import SettingsPage from '@/pages/settings';
import ProtectedRoute from '@/routes/protected-routes';
import PublicRoutes from '@/routes/public-routes';

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
