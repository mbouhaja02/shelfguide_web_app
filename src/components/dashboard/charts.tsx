'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

interface BarChartCardProps {
  title: string;
  data: { category: string; count: number }[];
  color?: string;
  className?: string;
}

export function BarChartCard({ title, data, color = '#0ea5e9', className }: BarChartCardProps) {
  return (
    <div className={`rounded-2xl border border-sky-100/60 bg-white p-5 ${className || ''}`}>
      <h3 className="text-[13px] font-semibold text-foreground mb-1">{title}</h3>
      <div className="h-[250px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
            <YAxis dataKey="category" type="category" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} width={120} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '8px 12px' }}
              cursor={{ fill: 'rgba(99, 102, 241, 0.04)' }}
            />
            <Bar dataKey="count" fill={color} radius={[0, 6, 6, 0]} barSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface PieChartCardProps {
  title: string;
  data: { status: string; count: number; color: string }[];
  className?: string;
}

export function PieChartCard({ title, data, className }: PieChartCardProps) {
  return (
    <div className={`rounded-2xl border border-sky-100/60 bg-white p-5 ${className || ''}`}>
      <h3 className="text-[13px] font-semibold text-foreground mb-1">{title}</h3>
      <div className="h-[250px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="count"
              nameKey="status"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '8px 12px' }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 11, color: '#64748b' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
