import { createBrowserRouter } from 'react-router';

import Layout from '@/components/layout';
import Login from '@/pages/login';
import Main from '@/pages/main';
import Onboarding from '@/pages/onboarding';
import Settings from '@/pages/settings';
import ProtectedRoute from '@/routes/protected-routes';
import PublicRoutes from '@/routes/public-routes';

export const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [{ path: '/login', Component: Login }],
  },
  {
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/', Component: Main },
          { path: '/onboarding', Component: Onboarding },
          { path: '/settings', Component: Settings },
        ],
      },
    ],
  },
]);
