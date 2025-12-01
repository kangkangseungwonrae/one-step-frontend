import { Outlet } from 'react-router';

import { Header } from '../ui/header';
import { Nav } from '@/components/ui/nav';

export default function Layout() {
  return (
    <main className="flex-1 flex flex-col h-screen">
      <div className="flex-1 max-w-md mx-auto w-full pb-20">
        <Header />
        <div className="p-4 h-full">
          <Outlet />
        </div>
        <Nav />
      </div>
    </main>
  );
}
