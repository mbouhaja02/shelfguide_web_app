'use client';

import { useAuth } from '@/hooks/use-auth';
import { Bell, Search, Menu, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockNotifications } from '@/data/mock-data';
import { UserRoleSwitcher } from '@/components/dashboard/user-role-switcher';
import Link from 'next/link';

interface AppHeaderProps {
  onMenuToggle?: () => void;
}

export function AppHeader({ onMenuToggle }: AppHeaderProps) {
  const { user } = useAuth();
  const unreadCount = mockNotifications.filter(n => n.userId === user?.id && !n.read).length;
  const initials = user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  const roleLabel = user?.role === 'chef_rayon' ? 'Chef de rayon' : 'Brand Manager';

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-sky-100/60 glass px-4 lg:px-6">
      <button className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-sky-50 transition-colors" onClick={onMenuToggle}>
        <Menu className="h-5 w-5 text-muted-foreground" />
      </button>

      <div className="hidden md:flex flex-1 items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
          <input
            placeholder="Rechercher un magasin, audit, action..."
            className="w-full h-8 rounded-xl bg-sky-50/60 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none ring-0 focus:bg-sky-50 focus:ring-1 focus:ring-sky-300/40 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded-md border border-sky-200/60 bg-sky-50/60 px-1.5 text-[10px] font-medium text-muted-foreground/70">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        <UserRoleSwitcher />

        <Link
          href={user?.role === 'chef_rayon' ? '/chef-rayon/notifications' : '/brand-manager/notifications'}
          className="relative p-2 rounded-lg hover:bg-sky-50 transition-colors"
        >
          <Bell className="h-[18px] w-[18px] text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="w-px h-6 bg-sky-200/50 mx-1 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 py-1 px-2 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer outline-none">
            <Avatar className="h-7 w-7 ring-2 ring-sky-200/40">
              <AvatarFallback className="bg-gradient-to-br from-sky-400 to-cyan-500 text-white text-[10px] font-bold">{initials}</AvatarFallback>
            </Avatar>
            <div className="hidden lg:flex flex-col items-start text-left">
              <span className="text-[13px] font-medium leading-none text-foreground">{user?.fullName}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">{roleLabel}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href={user?.role === 'chef_rayon' ? '/chef-rayon/profile' : '/brand-manager/profile'} />}>
              <User className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={user?.role === 'chef_rayon' ? '/chef-rayon/settings' : '/brand-manager/settings'} />}>
              <Settings className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              Paramètres
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
