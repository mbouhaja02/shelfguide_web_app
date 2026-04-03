import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react';

interface KPIStatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

const iconBgMap: Record<string, string> = {
  'text-blue-600': 'bg-blue-50 text-blue-600',
  'text-red-500': 'bg-red-50 text-red-500',
  'text-amber-500': 'bg-amber-50 text-amber-600',
  'text-green-600': 'bg-emerald-50 text-emerald-600',
  'text-purple-500': 'bg-purple-50 text-purple-600',
  'text-emerald-600': 'bg-emerald-50 text-emerald-600',
  'text-indigo-600': 'bg-indigo-50 text-indigo-600',
};

export function KPIStatCard({
  label,
  value,
  change,
  changeLabel,
  trend,
  icon: Icon,
  iconColor = 'text-primary',
  className,
}: KPIStatCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-600 bg-emerald-50' : trend === 'down' ? 'text-red-600 bg-red-50' : 'text-muted-foreground bg-muted';
  const iconBg = iconBgMap[iconColor] || 'bg-primary/10 text-primary';

  return (
    <div className={cn(
      'group relative rounded-xl border border-border/60 bg-white p-5 transition-all duration-300 hover:shadow-md hover:shadow-black/[0.04] hover:border-border',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <p className="text-[13px] font-medium text-muted-foreground leading-none">{label}</p>
          <p className="text-[28px] font-bold tracking-tight leading-none text-foreground">{value}</p>
          {(change !== undefined || changeLabel) && (
            <div className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold', trendColor)}>
              <TrendIcon className="h-3 w-3" />
              <span>{change !== undefined ? `${change > 0 ? '+' : ''}${change}%` : ''} {changeLabel || ''}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110', iconBg)}>
            <Icon className="h-[18px] w-[18px]" />
          </div>
        )}
      </div>
    </div>
  );
}
