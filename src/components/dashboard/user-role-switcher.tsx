'use client';

import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeftRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UserRoleSwitcher() {
  const { user, switchRole } = useAuth();
  const router = useRouter();

  const handleSwitch = (role: UserRole) => {
    switchRole(role);
    router.push(role === 'chef_rayon' ? '/chef-rayon' : '/brand-manager');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-[11px] font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/20 h-7 px-2.5 cursor-pointer hover:brightness-110 transition-all"
      >
        <ArrowLeftRight className="h-3 w-3" />
        <span className="hidden sm:inline">Démo</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          onClick={() => handleSwitch('chef_rayon')}
          className={user?.role === 'chef_rayon' ? 'bg-indigo-50 text-indigo-700' : ''}
        >
          {user?.role === 'chef_rayon' && <Check className="h-3.5 w-3.5 mr-1.5" />}
          Chef de rayon
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSwitch('brand_manager')}
          className={user?.role === 'brand_manager' ? 'bg-indigo-50 text-indigo-700' : ''}
        >
          {user?.role === 'brand_manager' && <Check className="h-3.5 w-3.5 mr-1.5" />}
          Brand Manager
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
