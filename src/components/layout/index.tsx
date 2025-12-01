import { type ReactNode } from 'react';

import { Header } from '../ui/header';
import { Nav } from '@/components/ui/nav';

/**
 * Layout 컴포넌트. 페이지에 씌워서 사용합니다.
 * @param children: 페이지 내용
 * @param header: 헤더 컴포넌트 (기본값: Header)
 * @param nav: 네비게이션 컴포넌트 (기본값: Nav)
 * @returns
 */
export default function Layout({
  children,
  header = false,
  nav = false,
}: {
  children: ReactNode;
  header?: ReactNode;
  nav?: ReactNode;
}) {
  return (
    <main className="flex-1 flex flex-col h-screen">
      <div className="flex flex-col max-w-md mx-auto w-full mb-20 h-full flex-1">
        {header && <Header />}
        <div className="p-4 flex-1">{children}</div>
      </div>
      {nav && <Nav />}
    </main>
  );
}
