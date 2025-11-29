import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Send, History, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    title: 'Inventory',
    icon: Package,
    href: '/inventory',
  },
  {
    title: 'Resupply',
    icon: Send,
    href: '/resupply',
  },
  {
    title: 'Analytics',
    icon: History,
    href: '/analytics',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-border/40 bg-card">
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
