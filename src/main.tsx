import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { router } from './routes';

import './index.css';
import './lib/i18n';

dayjs.extend(utc);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
