'use client';

import { Audit } from '@/types';
import { getStore, getDepartment, getCategory } from '@/data/mock-data';
import { StatusBadge, SeverityBadge } from '@/components/dashboard/status-badge';
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

interface AuditTableProps {
  audits: Audit[];
  basePath: string;
}

export function AuditTable({ audits, basePath }: AuditTableProps) {
  return (
    <div className="rounded-2xl border border-sky-100/60 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 w-[90px]">ID</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Magasin</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Rayon</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Catégorie</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 text-center">Score</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Priorité</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Statut</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Date</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audits.map((audit) => {
            const store = getStore(audit.storeId);
            const dept = getDepartment(audit.departmentId);
            const cat = getCategory(audit.categoryId);
            return (
              <TableRow key={audit.id} className="group hover:bg-sky-50/40 transition-colors">
                <TableCell className="font-mono text-[11px] text-muted-foreground/70">
                  {audit.id.slice(0, 8).toUpperCase()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600 shrink-0">
                      {store?.name?.charAt(0) || '?'}
                    </div>
                    <span className="text-[13px] font-medium text-foreground">{store?.name || '—'}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[13px] text-muted-foreground">{dept?.name || '—'}</TableCell>
                <TableCell className="text-[13px] text-muted-foreground">{cat?.name || '—'}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center justify-center h-7 min-w-7 rounded-lg px-2 text-[12px] font-bold ${
                    audit.metrics.score >= 80 ? 'bg-emerald-50 text-emerald-700'
                    : audit.metrics.score >= 60 ? 'bg-amber-50 text-amber-700'
                    : 'bg-red-50 text-red-700'
                  }`}>
                    {audit.metrics.score}
                  </span>
                </TableCell>
                <TableCell><SeverityBadge priority={audit.priority} /></TableCell>
                <TableCell><StatusBadge status={audit.status} /></TableCell>
                <TableCell className="text-[12px] text-muted-foreground tabular-nums">
                  {format(new Date(audit.createdAt), 'dd MMM HH:mm', { locale: fr })}
                </TableCell>
                <TableCell>
                  <Link href={`${basePath}/${audit.id}`}>
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
