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
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[256px] flex-col transition-transform duration-300 ease-out lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ background: '#1a2332' }}
      >
        {/* Logo */}
        <div className="flex h-[64px] items-center gap-3 px-5 border-b border-white/[0.05]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden shrink-0">
            <Image src="/logo.jpeg" alt="ShelfGuide" width={32} height={32} className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[15px] leading-none text-white/90 tracking-tight font-[var(--font-heading)]">ShelfGuide</span>
            <span className="text-[9px] text-white/25 mt-1 uppercase tracking-[0.2em] font-medium">Retail ops</span>
          </div>
          <button className="ml-auto lg:hidden text-white/30 hover:text-white/60 transition-colors" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="mb-3 px-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/20">
              {isBM ? 'Brand Manager' : 'Chef de rayon'}
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
                      'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150',
                      active
                        ? 'bg-white/[0.08] text-white'
                        : 'text-white/45 hover:text-white/80 hover:bg-white/[0.03] hover:translate-x-0.5'
                    )}
                  >
                    <Icon className={cn(
                      'h-[17px] w-[17px] shrink-0 transition-colors duration-150',
                      active ? 'text-[#56b3e6]' : 'text-white/25 group-hover:text-white/50'
                    )} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        'flex h-[18px] min-w-[18px] items-center justify-center rounded-md px-1 text-[9px] font-bold',
                        active
                          ? 'bg-[#56b3e6]/20 text-[#56b3e6]'
                          : item.badgeColor || 'bg-white/6 text-white/35'
                      )}>
                        {item.badge}
                      </span>
                    )}
                    {active && <div className="h-1.5 w-1.5 rounded-full bg-[#56b3e6]" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Separator — organic wavy line instead of straight */}
          <div className="my-5 mx-3 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

          <div className="mb-3 px-3">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/20">
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
                      'group flex items-center gap-3 rounded-lg px-3 py-2 text-[12px] font-medium transition-all duration-150',
                      active
                        ? 'bg-white/[0.06] text-white/90'
                        : 'text-white/35 hover:text-white/70 hover:bg-white/[0.03]'
                    )}
                  >
                    <Icon className={cn(
                      'h-[15px] w-[15px] shrink-0',
                      active ? 'text-[#56b3e6]' : 'text-white/20'
                    )} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-md bg-red-500/15 px-1 text-[9px] font-bold text-red-400">
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
        <div className="border-t border-white/[0.05] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 text-white/70 text-[10px] font-bold shrink-0">
              {user?.fullName?.split(' ').map(n => n[0]).join('') || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-white/80 truncate">{user?.fullName}</p>
              <p className="text-[10px] text-white/25 truncate">{isBM ? 'Brand Manager' : 'Chef de rayon'}</p>
            </div>
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-emerald-400 animate-ping opacity-40" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
