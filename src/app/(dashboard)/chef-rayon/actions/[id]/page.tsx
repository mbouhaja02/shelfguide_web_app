'use client';

import { use } from 'react';
import { mockActions, mockAudits, getStore, getDepartment } from '@/data/mock-data';
import { ActionStatusBadge, SeverityBadge, StatusBadge } from '@/components/dashboard/status-badge';
import { EmptyState } from '@/components/dashboard/empty-state';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft, Store, Layers, User, Calendar, Clock, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function ActionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const action = mockActions.find(a => a.id === id);

  if (!action) {
    return (
      <EmptyState
        title="Action introuvable"
        description="L'action corrective demandée n'existe pas."
        action={
          <Link href="/chef-rayon/actions" className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-white px-4 py-2 text-[13px] font-medium hover:bg-slate-50 transition-colors">
            Retour aux actions
          </Link>
        }
      />
    );
  }

  const audit = mockAudits.find(a => a.id === action.auditId);
  const store = getStore(action.storeId);
  const dept = getDepartment(action.departmentId);
  const isPastDue = new Date(action.dueDate) < new Date() && action.status !== 'corrected';

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-start gap-3">
        <Link href="/chef-rayon/actions" className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 className="text-[22px] font-semibold tracking-tight">{action.title}</h1>
            <ActionStatusBadge status={action.status} />
            <SeverityBadge priority={action.priority} />
          </div>
          <p className="text-[13px] text-muted-foreground">{store?.name} · {dept?.name}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
        <div className="border-b border-border/30 px-5 py-3.5">
          <h3 className="text-[14px] font-semibold">Description</h3>
        </div>
        <div className="p-5">
          <p className="text-[13px] leading-relaxed">{action.description}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
        <div className="border-b border-border/30 px-5 py-3.5">
          <h3 className="text-[14px] font-semibold">Détails</h3>
        </div>
        <div className="p-5 space-y-3 text-[13px]">
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-muted-foreground">Magasin :</span>
            <span className="font-medium">{store?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-muted-foreground">Rayon :</span>
            <span className="font-medium">{dept?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-muted-foreground">Responsable :</span>
            <span className="font-medium">{action.assigneeName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-muted-foreground">Créée le :</span>
            <span className="font-medium">{format(new Date(action.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${isPastDue ? 'text-red-500' : 'text-muted-foreground/60'}`} />
            <span className="text-muted-foreground">Échéance :</span>
            <span className={`font-medium ${isPastDue ? 'text-red-600' : ''}`}>
              {format(new Date(action.dueDate), 'dd MMMM yyyy à HH:mm', { locale: fr })}
              {isPastDue && ' (en retard)'}
            </span>
          </div>
          {action.completedAt && (
            <div className="flex items-center gap-2 text-green-600">
              <Calendar className="h-4 w-4" />
              <span>Terminée le :</span>
              <span className="font-medium">{format(new Date(action.completedAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}</span>
            </div>
          )}
        </div>
      </div>

      {audit && (
        <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border/30 px-5 py-3.5">
            <LinkIcon className="h-4 w-4 text-muted-foreground/60" />
            <h3 className="text-[14px] font-semibold">Audit d&apos;origine</h3>
          </div>
          <div className="p-5">
            <Link href={`/chef-rayon/audits/${audit.id}`} className="flex items-center justify-between p-3 rounded-xl border border-border/60 hover:bg-slate-50/80 transition-colors">
              <div>
                <p className="text-[13px] font-medium">Audit {audit.id.toUpperCase()}</p>
                <p className="text-[11px] text-muted-foreground">Score {audit.metrics.score}/100 · {audit.metrics.emptyZonesCount} zones vides</p>
              </div>
              <StatusBadge status={audit.status} />
            </Link>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {action.status === 'todo' && (
          <button className="h-9 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 text-[13px] font-medium text-white hover:from-indigo-600 hover:to-violet-700 transition-all">
            Commencer l&apos;action
          </button>
        )}
        {action.status === 'in_progress' && (
          <button className="h-9 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 text-[13px] font-medium text-white hover:from-indigo-600 hover:to-violet-700 transition-all">
            Marquer comme corrigé
          </button>
        )}
        {action.status === 'to_validate' && (
          <>
            <button className="h-9 rounded-xl bg-green-600 px-5 text-[13px] font-medium text-white hover:bg-green-700 transition-colors">
              Valider
            </button>
            <button className="h-9 rounded-xl border border-red-200 px-5 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors">
              Rejeter
            </button>
          </>
        )}
      </div>
    </div>
  );
}
