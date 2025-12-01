import { Home, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import type { ComponentType } from 'react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'HOME',
    href: '/',
    icon: Home,
  },
  {
    id: 'setting',
    label: 'SETTING',
    href: '/settings',
    icon: Settings,
  },
];

export function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card max-w-md mx-auto">
      <div className="flex items-center justify-between gap-0">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;

          return (
            <Link
              key={item.id}
              to={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-6 py-4 transition-colors ${
                isActive ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
