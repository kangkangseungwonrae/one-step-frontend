import { Outlet, useLocation } from 'react-router';

import { Header } from '../ui/header';
import { Nav } from '@/components/ui/nav';

/**
 * Layout 컴포넌트. 페이지에 씌워서 사용합니다.
 * @param children: 페이지 내용
 * @param hasHeader: 헤더 컴포넌트 사용 여부 (기본값: false)
 * @param hasNav: 네비게이션 컴포넌트 사용 여부 (기본값: false)
 * @returns
 */
export default function Layout() {
  const { pathname } = useLocation();

  // 특정 경로에서 Header/Nav를 보여줄지 결정하는 로직
  // 또는 각 Route의 handle이나 meta 데이터를 사용할 수도 있습니다.
  const hideHeaderPaths = ['/login', '/auth'];
  const hideNavPaths = ['/login', '/auth', '/detail', '/onboarding'];

  const hasHeader = !hideHeaderPaths.includes(pathname);
  const hasNav = !hideNavPaths.includes(pathname);

  return (
    <main className="flex-1 flex flex-col h-screen">
      <div className={`flex flex-col max-w-md mx-auto w-full h-full flex-1`}>
        {hasHeader && <Header />}
        <div className={`p-4 flex-1 h-full overflow-auto scrollbar-hide ${hasNav ? 'pb-[calc(74px+16px)]' : ''}`}>
          <Outlet />
        </div>
      </div>
      {hasNav && <Nav />}
    </main>
  );
}
