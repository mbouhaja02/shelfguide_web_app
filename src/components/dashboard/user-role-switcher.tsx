'use client';

import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeftRight, Check, Store, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UserRoleSwitcher() {
  const { user, switchRole } = useAuth();
  const router = useRouter();

  const handleSwitch = (role: UserRole) => {
    switchRole(role);
    router.push(role === 'chef_rayon' ? '/chef-rayon' : '/brand-manager');
  };

  const currentLabel = user?.role === 'chef_rayon' ? 'Chef de rayon' : 'Brand Manager';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-[12px] font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/20 h-8 px-3 cursor-pointer hover:brightness-110 transition-all"
      >
        <ArrowLeftRight className="h-3.5 w-3.5" />
        <span>{currentLabel}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={() => handleSwitch('chef_rayon')}
          className={user?.role === 'chef_rayon' ? 'bg-indigo-50 text-indigo-700' : ''}
        >
          <Store className="h-4 w-4 mr-2" />
          <div className="flex-1">
            <p className="text-[13px] font-medium">Chef de rayon</p>
            <p className="text-[11px] text-muted-foreground">Yassine El Amrani · Marjane</p>
          </div>
          {user?.role === 'chef_rayon' && <Check className="h-3.5 w-3.5 ml-2 text-indigo-600" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSwitch('brand_manager')}
          className={user?.role === 'brand_manager' ? 'bg-indigo-50 text-indigo-700' : ''}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          <div className="flex-1">
            <p className="text-[13px] font-medium">Brand Manager</p>
            <p className="text-[11px] text-muted-foreground">Salma Bennani · Noor Délice</p>
          </div>
          {user?.role === 'brand_manager' && <Check className="h-3.5 w-3.5 ml-2 text-indigo-600" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
