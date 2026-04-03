'use client';

import { CorrectiveAction } from '@/types';
import { getStore, getDepartment } from '@/data/mock-data';
import { ActionStatusBadge, SeverityBadge } from '@/components/dashboard/status-badge';
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
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ActionTableProps {
  actions: CorrectiveAction[];
  basePath: string;
}

export function ActionTable({ actions, basePath }: ActionTableProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Action</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Magasin</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Rayon</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Priorité</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Statut</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Responsable</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Échéance</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions.map((action) => {
            const store = getStore(action.storeId);
            const dept = getDepartment(action.departmentId);
            const isPastDue = new Date(action.dueDate) < new Date() && action.status !== 'corrected';
            return (
              <TableRow key={action.id} className="group hover:bg-indigo-50/30 transition-colors">
                <TableCell>
                  <div className="max-w-[250px]">
                    <p className="text-[13px] font-medium text-foreground truncate">{action.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">{action.description}</p>
                  </div>
                </TableCell>
                <TableCell className="text-[13px] text-foreground">{store?.name || '—'}</TableCell>
                <TableCell className="text-[13px] text-muted-foreground">{dept?.name || '—'}</TableCell>
                <TableCell><SeverityBadge priority={action.priority} /></TableCell>
                <TableCell><ActionStatusBadge status={action.status} /></TableCell>
                <TableCell className="text-[13px] text-muted-foreground">{action.assigneeName}</TableCell>
                <TableCell>
                  <span className={`text-[12px] tabular-nums ${isPastDue ? 'text-red-600 font-semibold' : 'text-muted-foreground'}`}>
                    {format(new Date(action.dueDate), 'dd MMM HH:mm', { locale: fr })}
                  </span>
                </TableCell>
                <TableCell>
                  <Link href={`${basePath}/${action.id}`}>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/40 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
