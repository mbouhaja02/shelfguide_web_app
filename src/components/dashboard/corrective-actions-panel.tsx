'use client';

import { CorrectiveAction } from '@/types';
import { ActionStatusBadge, SeverityBadge } from '@/components/dashboard/status-badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Wrench, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface CorrectiveActionsPanelProps {
  actions: CorrectiveAction[];
  basePath: string;
  maxItems?: number;
}

export function CorrectiveActionsPanel({ actions, basePath, maxItems = 5 }: CorrectiveActionsPanelProps) {
  const pendingActions = actions
    .filter(a => a.status === 'todo' || a.status === 'in_progress')
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, maxItems);

  return (
    <div className="rounded-xl border border-border/60 bg-white">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border/40">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
          <Wrench className="h-3.5 w-3.5 text-indigo-600" />
        </div>
        <h3 className="text-[13px] font-semibold text-foreground">Actions à traiter</h3>
        <span className="ml-auto text-[11px] text-muted-foreground font-medium">{pendingActions.length} en cours</span>
      </div>
      <div className="divide-y divide-border/30">
        {pendingActions.length === 0 ? (
          <p className="text-[13px] text-muted-foreground text-center py-8">Toutes les actions sont traitées</p>
        ) : (
          pendingActions.map((action) => {
            const isPastDue = new Date(action.dueDate) < new Date() && action.status !== 'corrected';
            return (
              <Link
                key={action.id}
                href={`${basePath}/${action.id}`}
                className="group block px-5 py-3.5 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px] font-medium text-foreground flex-1 truncate">{action.title}</span>
                  <SeverityBadge priority={action.priority} />
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <ActionStatusBadge status={action.status} />
                  <span className={`flex items-center gap-1 ${isPastDue ? 'text-red-600 font-semibold' : 'text-muted-foreground'}`}>
                    <Clock className={`h-3 w-3 ${isPastDue ? 'text-red-500' : ''}`} />
                    {format(new Date(action.dueDate), 'dd MMM HH:mm', { locale: fr })}
                  </span>
                  <span className="text-muted-foreground">{action.assigneeName}</span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
