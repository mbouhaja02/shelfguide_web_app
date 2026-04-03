'use client';

import { StorePerformance } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface StorePerformanceTableProps {
  stores: StorePerformance[];
}

function ScoreCell({ score }: { score: number }) {
  const color = score >= 80 ? 'text-emerald-700 bg-emerald-50' : score >= 60 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50';
  return (
    <span className={cn('inline-flex items-center justify-center rounded-lg h-7 min-w-7 px-2 text-[12px] font-bold', color)}>
      {score}
    </span>
  );
}

export function StorePerformanceTable({ stores }: StorePerformanceTableProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Magasin</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Enseigne</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Région</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 text-center">Score</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 text-center">Anomalies</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 text-center">Ruptures</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 text-center">Conformité</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Dernier audit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stores.map((store) => (
            <TableRow key={store.storeId} className="hover:bg-[#fafbfd] transition-colors duration-150">
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600 shrink-0">
                    {store.storeName.charAt(0)}
                  </div>
                  <span className="text-[13px] font-medium text-foreground">{store.storeName}</span>
                </div>
              </TableCell>
              <TableCell className="text-[13px] text-muted-foreground">{store.retailer}</TableCell>
              <TableCell className="text-[13px] text-muted-foreground">{store.region}</TableCell>
              <TableCell className="text-center"><ScoreCell score={store.globalScore} /></TableCell>
              <TableCell className="text-center text-[13px] tabular-nums">{store.anomalies}</TableCell>
              <TableCell className="text-center">
                <span className={cn('text-[13px] tabular-nums', store.ruptures > 3 ? 'text-red-600 font-semibold' : '')}>{store.ruptures}</span>
              </TableCell>
              <TableCell className="text-center">
                <span className={cn('text-[13px] tabular-nums font-medium',
                  store.complianceRate >= 80 ? 'text-emerald-600' : store.complianceRate >= 60 ? 'text-amber-600' : 'text-red-600'
                )}>
                  {store.complianceRate}%
                </span>
              </TableCell>
              <TableCell className="text-[12px] text-muted-foreground tabular-nums">
                {format(new Date(store.lastAuditDate), 'dd MMM HH:mm', { locale: fr })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
