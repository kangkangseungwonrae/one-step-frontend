import { createBrowserRouter } from 'react-router';

import Login from '../pages/login';
import Main from '../pages/main';
import Onboarding from '../pages/onboarding';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/onboarding',
    Component: Onboarding,
  },
]);
