import { createBrowserRouter } from 'react-router';

import Main from './pages/main';
import Onboarding from './pages/onboarding';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
  },
  {
    path: '/onboarding',
    Component: Onboarding,
  },
]);
