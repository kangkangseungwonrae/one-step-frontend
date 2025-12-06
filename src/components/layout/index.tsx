import { type ReactNode } from 'react';

import { Header } from '../ui/header';
import { Nav } from '@/components/ui/nav';

type LayoutProps = {
  children: ReactNode;
  hasHeader?: boolean;
  hasNav?: boolean;
};

/**
 * Layout 컴포넌트. 페이지에 씌워서 사용합니다.
 * @param children: 페이지 내용
 * @param hasHeader: 헤더 컴포넌트 사용 여부 (기본값: false)
 * @param hasNav: 네비게이션 컴포넌트 사용 여부 (기본값: false)
 * @returns
 */
export default function Layout({ children, hasHeader = false, hasNav = false }: LayoutProps) {
  return (
    <main className="flex-1 flex flex-col h-screen">
      <div className={`flex flex-col max-w-md mx-auto w-full h-full flex-1 ${hasNav ? 'mb-20' : ''}`}>
        {hasHeader && <Header />}
        <div className="p-4 flex-1 h-full">{children}</div>
      </div>
      {hasNav && <Nav />}
    </main>
  );
}
