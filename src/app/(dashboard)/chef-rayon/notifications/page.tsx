'use client';

import { mockNotifications } from '@/data/mock-data';
import { useAuth } from '@/hooks/use-auth';
import { Bell, AlertTriangle, CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const iconMap = {
  alert: AlertTriangle,
  warning: AlertCircle,
  success: CheckCircle2,
  info: Info,
};

const colorMap = {
  alert: 'text-red-500 bg-red-50',
  warning: 'text-amber-500 bg-amber-50',
  success: 'text-green-500 bg-green-50',
  info: 'text-blue-500 bg-blue-50',
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const notifications = mockNotifications.filter(n => n.userId === user?.id);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Notifications</h1>
        <p className="text-[13px] text-muted-foreground">{notifications.filter(n => !n.read).length} non lue(s)</p>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => {
          const Icon = iconMap[notif.type];
          const colorClass = colorMap[notif.type];
          return (
            <Link key={notif.id} href={notif.actionUrl || '#'}>
              <div className={cn('rounded-2xl border border-[#e2e9f2] bg-white p-4 flex items-start gap-3 hover:shadow-md hover:shadow-black/[0.04] transition-all cursor-pointer', !notif.read && 'border-l-4 border-l-[#2d9cdb]')}>
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl shrink-0', colorClass)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className={cn('text-[13px] font-semibold', !notif.read && 'text-foreground')}>{notif.title}</h4>
                    {!notif.read && <div className="h-2 w-2 rounded-full bg-[#f0f3f7]0" />}
                  </div>
                  <p className="text-[12px] text-muted-foreground">{notif.message}</p>
                  <p className="text-[11px] text-muted-foreground/60 mt-1">
                    {format(new Date(notif.createdAt), 'dd MMM à HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
