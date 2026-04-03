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
    <header className="sticky top-0 z-30 flex h-[52px] items-center gap-4 border-b border-[#e2e9f2] bg-white/90 backdrop-blur-sm px-4 lg:px-6">
      <button className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-muted transition-colors" onClick={onMenuToggle}>
        <Menu className="h-5 w-5 text-muted-foreground" />
      </button>

      <div className="hidden md:flex flex-1 items-center">
        <div className="relative w-64 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 transition-colors group-focus-within:text-primary" />
          <input
            placeholder="Rechercher..."
            className="w-full h-8 rounded-lg bg-[#f0f3f7] pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground/40 outline-none ring-0 focus:bg-white focus:ring-1 focus:ring-primary/30 focus:shadow-sm transition-all duration-200"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-[#dde5ef] bg-white px-1.5 text-[10px] font-mono text-muted-foreground/60">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <UserRoleSwitcher />

        <Link
          href={user?.role === 'chef_rayon' ? '/chef-rayon/notifications' : '/brand-manager/notifications'}
          className="relative p-2 rounded-lg hover:bg-muted transition-colors group"
        >
          <Bell className="h-[17px] w-[17px] text-muted-foreground transition-transform duration-200 group-hover:rotate-12" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#e74c3c] px-1 text-[8px] font-bold text-white ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="w-px h-5 bg-border mx-1 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer outline-none">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-[#1a2332] text-white text-[10px] font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div className="hidden lg:flex flex-col items-start text-left">
              <span className="text-[12px] font-medium leading-none text-foreground">{user?.fullName}</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">{roleLabel}</span>
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
