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
  /** 0-based index for stagger animation */
  index?: number;
}

const iconBgMap: Record<string, string> = {
  'text-blue-600': 'bg-blue-50/80 text-blue-600',
  'text-primary': 'bg-[#f0f3f7]/80 text-primary',
  'text-red-500': 'bg-red-50/80 text-red-500',
  'text-amber-500': 'bg-amber-50/80 text-amber-600',
  'text-green-600': 'bg-emerald-50/80 text-emerald-600',
  'text-purple-500': 'bg-purple-50/80 text-purple-600',
  'text-emerald-600': 'bg-emerald-50/80 text-emerald-600',
  'text-cyan-600': 'bg-cyan-50/80 text-cyan-600',
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
  index = 0,
}: KPIStatCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-700 bg-emerald-50/80' : trend === 'down' ? 'text-red-600 bg-red-50/80' : 'text-muted-foreground bg-muted';
  const iconBg = iconBgMap[iconColor] || 'bg-primary/8 text-primary';
  const stagger = `stagger-${Math.min(index + 1, 6)}` as string;

  return (
    <div className={cn(
      'group relative bg-white border border-[#e2e9f2] p-4 lg:p-5 transition-all duration-200 hover-lift animate-slide-up',
      // Vary border radius slightly per card position for organic feel
      index % 3 === 0 ? 'rounded-2xl' : index % 3 === 1 ? 'rounded-xl' : 'rounded-[14px]',
      stagger,
      className
    )}
    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2.5 flex-1 min-w-0">
          <p className="text-[12px] font-medium text-muted-foreground/80 leading-tight tracking-wide uppercase">{label}</p>
          <p className="text-[26px] font-bold tracking-tight leading-none text-foreground font-[var(--font-heading)]">{value}</p>
          {(change !== undefined || changeLabel) && (
            <div className={cn('inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold', trendColor)}>
              <TrendIcon className="h-3 w-3" />
              <span>{change !== undefined ? `${change > 0 ? '+' : ''}${change}%` : ''} {changeLabel || ''}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-105 group-hover:rotate-3', iconBg)}>
            <Icon className="h-[17px] w-[17px]" />
          </div>
        )}
      </div>
    </div>
  );
}
