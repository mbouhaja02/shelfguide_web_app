'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import {
  LayoutDashboard,
  ClipboardCheck,
  AlertTriangle,
  Store,
  BarChart3,
  Lightbulb,
  Package,
  X,
  ChevronRight,
  Bell,
  Settings,
  User,
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
  badgeColor?: string;
}

const chefRayonNav: NavItem[] = [
  { label: 'Pilotage opérationnel', href: '/chef-rayon', icon: LayoutDashboard },
  { label: 'Mes rayons', href: '/chef-rayon/departments', icon: Store },
  { label: 'Audits terrain', href: '/chef-rayon/audits', icon: ClipboardCheck, badge: '4', badgeColor: 'bg-amber-500/20 text-amber-400' },
  { label: 'Actions correctives', href: '/chef-rayon/actions', icon: AlertTriangle, badge: '6', badgeColor: 'bg-red-500/20 text-red-400' },
];

const chefRayonSecondaryNav: NavItem[] = [
  { label: 'Notifications', href: '/chef-rayon/notifications', icon: Bell, badge: '3' },
  { label: 'Profil', href: '/chef-rayon/profile', icon: User },
  { label: 'Paramètres', href: '/chef-rayon/settings', icon: Settings },
];

const brandManagerNav: NavItem[] = [
  { label: 'Pilotage global', href: '/brand-manager', icon: LayoutDashboard },
  { label: 'Réseau de magasins', href: '/brand-manager/stores', icon: Store },
  { label: 'Performance d\'exécution', href: '/brand-manager/performance', icon: Package },
  { label: 'Audits terrain', href: '/brand-manager/audits', icon: ClipboardCheck },
  { label: 'Insights & Recommandations', href: '/brand-manager/insights', icon: Lightbulb },
];

const brandManagerSecondaryNav: NavItem[] = [
  { label: 'Notifications', href: '/brand-manager/notifications', icon: Bell, badge: '2' },
  { label: 'Profil', href: '/brand-manager/profile', icon: User },
  { label: 'Paramètres', href: '/brand-manager/settings', icon: Settings },
];

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const isBM = user?.role === 'brand_manager';
  const navItems = isBM ? brandManagerNav : chefRayonNav;
  const secondaryNav = isBM ? brandManagerSecondaryNav : chefRayonSecondaryNav;

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
          'fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col bg-sidebar transition-transform duration-300 ease-out lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-[68px] items-center gap-3 px-5 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 overflow-hidden shrink-0">
            <Image src="/logo.jpeg" alt="ShelfGuide" width={36} height={36} className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[16px] leading-none text-white tracking-tight">ShelfGuide</span>
            <span className="text-[10px] text-sidebar-foreground/40 mt-1 uppercase tracking-widest font-medium">Retail Intelligence</span>
          </div>
          <button className="ml-auto lg:hidden text-sidebar-foreground/60 hover:text-white transition-colors" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="mb-2 px-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/30">
              {isBM ? 'Espace Brand Manager' : 'Espace Chef de rayon'}
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
                      'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200',
                      active
                        ? 'bg-white/[0.08] text-white shadow-sm'
                        : 'text-sidebar-foreground/60 hover:text-white hover:bg-white/[0.04]'
                    )}
                  >
                    <Icon className={cn(
                      'h-[18px] w-[18px] shrink-0 transition-colors',
                      active ? 'text-blue-400' : 'text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70'
                    )} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold',
                        active
                          ? 'bg-blue-500/20 text-blue-300'
                          : item.badgeColor || 'bg-white/8 text-sidebar-foreground/50'
                      )}>
                        {item.badge}
                      </span>
                    )}
                    {active && <ChevronRight className="h-3.5 w-3.5 text-sidebar-foreground/30" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Secondary nav */}
          <div className="mt-6 mb-2 px-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/30">
              Compte
            </span>
          </div>
          <ul className="space-y-0.5">
            {secondaryNav.map((item) => {
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
                        ? 'bg-white/[0.08] text-white'
                        : 'text-sidebar-foreground/50 hover:text-white hover:bg-white/[0.04]'
                    )}
                  >
                    <Icon className={cn(
                      'h-[16px] w-[16px] shrink-0',
                      active ? 'text-blue-400' : 'text-sidebar-foreground/35'
                    )} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500/20 px-1 text-[9px] font-bold text-red-400">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer — User card */}
        <div className="border-t border-sidebar-border px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-[10px] font-bold shrink-0">
              {user?.fullName?.split(' ').map(n => n[0]).join('') || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-white truncate">{user?.fullName}</p>
              <p className="text-[10px] text-sidebar-foreground/40 truncate">{isBM ? 'Brand Manager' : 'Chef de rayon'}</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/40" />
          </div>
        </div>
      </aside>
    </>
  );
}
