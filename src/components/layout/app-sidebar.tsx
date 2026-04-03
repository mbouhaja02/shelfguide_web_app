'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import {
  LayoutDashboard,
  ClipboardCheck,
  AlertTriangle,
  Store,
  BarChart3,
  TrendingUp,
  Lightbulb,
  Package,
  X,
  ChevronRight,
} from 'lucide-react';

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const chefRayonNav: NavItem[] = [
  { label: 'Vue d\'ensemble', href: '/chef-rayon', icon: LayoutDashboard },
  { label: 'Mes rayons', href: '/chef-rayon/departments', icon: Store },
  { label: 'Audits', href: '/chef-rayon/audits', icon: ClipboardCheck, badge: '3' },
  { label: 'Actions correctives', href: '/chef-rayon/actions', icon: AlertTriangle, badge: '5' },
];

const brandManagerNav: NavItem[] = [
  { label: 'Vue globale', href: '/brand-manager', icon: LayoutDashboard },
  { label: 'Magasins', href: '/brand-manager/stores', icon: Store },
  { label: 'Performance', href: '/brand-manager/performance', icon: Package },
  { label: 'Audits', href: '/brand-manager/audits', icon: ClipboardCheck },
  { label: 'Insights', href: '/brand-manager/insights', icon: Lightbulb },
];

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const navItems = user?.role === 'brand_manager' ? brandManagerNav : chefRayonNav;

  const isActive = (href: string) => {
    if (href === '/chef-rayon' || href === '/brand-manager') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-sidebar transition-transform duration-300 ease-out lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
            SG
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[15px] leading-none text-white tracking-tight">ShelfGuide</span>
            <span className="text-[11px] text-sidebar-foreground/50 mt-0.5">Retail Analytics</span>
          </div>
          <button className="ml-auto lg:hidden text-sidebar-foreground/60 hover:text-white transition-colors" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="mb-3 px-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/40">
              {user?.role === 'brand_manager' ? 'Brand Manager' : 'Chef de rayon'}
            </span>
          </div>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200',
                      active
                        ? 'bg-sidebar-accent text-white shadow-sm'
                        : 'text-sidebar-foreground/70 hover:text-white hover:bg-white/[0.06]'
                    )}
                  >
                    <Icon className={cn(
                      'h-[18px] w-[18px] shrink-0 transition-colors',
                      active ? 'text-indigo-400' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80'
                    )} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold',
                        active
                          ? 'bg-indigo-500/30 text-indigo-300'
                          : 'bg-white/10 text-sidebar-foreground/60'
                      )}>
                        {item.badge}
                      </span>
                    )}
                    {active && <ChevronRight className="h-3.5 w-3.5 text-sidebar-foreground/40" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            </div>
            <span className="text-[11px] text-sidebar-foreground/50">Système opérationnel</span>
          </div>
        </div>
      </aside>
    </>
  );
}
