'use client';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { TrendDataPoint } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TrendCardProps {
  title: string;
  data: TrendDataPoint[];
  color?: string;
  unit?: string;
  className?: string;
}

export function TrendCard({ title, data, color = '#6366f1', unit = '', className }: TrendCardProps) {
  const formatted = data.map(d => ({
    ...d,
    dateLabel: format(new Date(d.date), 'dd MMM', { locale: fr }),
  }));

  const gradientId = `gradient-${title.replace(/\s/g, '')}`;

  return (
    <div className={`rounded-xl border border-border/60 bg-white p-5 ${className || ''}`}>
      <h3 className="text-[13px] font-semibold text-foreground mb-1">{title}</h3>
      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formatted} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.12} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="dateLabel" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={30} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '8px 12px' }}
              formatter={(value) => [`${value}${unit}`, title]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={{ r: 3, fill: '#fff', stroke: color, strokeWidth: 2 }}
              activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
