import { Calendar, Home, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import type { ComponentType } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

function NavItemComp({ label, href, icon, curPath }: NavItem & { curPath: string }) {
  const Icon = icon;
  const isActive = curPath === href;
  return (
    <Link
      to={href}
      className={`flex flex-col items-center justify-center gap-1 px-6 py-4 transition-colors ${
        isActive ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-primary'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}

export function Nav() {
  const location = useLocation();
  const curPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card max-w-md mx-auto">
      <div className="flex items-center justify-around">
        <NavItemComp label="HOME" href="/" icon={Home} curPath={curPath} />
        <NavItemComp label="CALENDAR" href="/calendar" icon={Calendar} curPath={curPath} />
        <NavItemComp label="SETTING" href="/settings" icon={Settings} curPath={curPath} />
      </div>
    </nav>
  );
}
