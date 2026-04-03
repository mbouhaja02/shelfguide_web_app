'use client';

import { Audit } from '@/types';
import { getStore } from '@/data/mock-data';
import { StatusBadge, SeverityBadge } from '@/components/dashboard/status-badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { AlertTriangle, Clock, ArrowUpRight } from 'lucide-react';

interface RecentAlertsListProps {
  audits: Audit[];
  basePath: string;
  maxItems?: number;
}

export function RecentAlertsList({ audits, basePath, maxItems = 5 }: RecentAlertsListProps) {
  const criticalAudits = audits
    .filter(a => a.priority === 'critical' || a.priority === 'high')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, maxItems);

  return (
    <div className="card-base">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#f0f3f7]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50/80">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
        </div>
        <h3 className="text-[13px] font-semibold text-foreground">Alertes prioritaires</h3>
        <span className="ml-auto text-[11px] text-muted-foreground font-medium">{criticalAudits.length} alertes</span>
      </div>
      <div className="divide-y divide-border/30">
        {criticalAudits.length === 0 ? (
          <p className="text-[13px] text-muted-foreground text-center py-8">Aucune alerte en cours</p>
        ) : (
          criticalAudits.map((audit) => {
            const store = getStore(audit.storeId);
            return (
              <Link
                key={audit.id}
                href={`${basePath}/${audit.id}`}
                className="group flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/80 transition-colors"
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${
                  audit.priority === 'critical' ? 'bg-red-50' : 'bg-orange-50'
                }`}>
                  <AlertTriangle className={`h-4 w-4 ${
                    audit.priority === 'critical' ? 'text-red-500' : 'text-orange-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-medium text-foreground truncate">{store?.name}</span>
                    <SeverityBadge priority={audit.priority} />
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>Score <strong className={audit.metrics.score < 60 ? 'text-red-600' : 'text-amber-600'}>{audit.metrics.score}</strong>/100</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(audit.createdAt), 'dd MMM HH:mm', { locale: fr })}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
