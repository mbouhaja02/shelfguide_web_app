'use client';

import { use } from 'react';
import { mockAudits, getStore, getDepartment, getCategory, getUser, getActionsForAudit } from '@/data/mock-data';
import { StatusBadge, SeverityBadge } from '@/components/dashboard/status-badge';
import { AuditImageViewer } from '@/components/dashboard/audit-image-viewer';
import { ZoneList } from '@/components/dashboard/zone-list';
import { CorrectiveActionsPanel } from '@/components/dashboard/corrective-actions-panel';
import { EmptyState } from '@/components/dashboard/empty-state';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  ArrowLeft,
  Store,
  Layers,
  Tag,
  User,
  Calendar,
  BarChart3,
  MessageSquare,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function AuditDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const audit = mockAudits.find(a => a.id === id);

  if (!audit) {
    return (
      <EmptyState
        title="Audit introuvable"
        description="L'audit demandé n'existe pas ou a été supprimé."
        action={
          <Link href="/chef-rayon/audits" className="inline-flex items-center gap-2 rounded-2xl border border-[#e2e9f2] bg-white px-4 py-2 text-[13px] font-medium hover:bg-[#f8fafb] transition-colors">
            Retour aux audits
          </Link>
        }
      />
    );
  }

  const store = getStore(audit.storeId);
  const dept = getDepartment(audit.departmentId);
  const cat = getCategory(audit.categoryId);
  const user = getUser(audit.userId);
  const actions = getActionsForAudit(audit.id);

  const scoreColor = audit.metrics.score >= 80 ? 'text-green-600' : audit.metrics.score >= 60 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Link href="/chef-rayon/audits" className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#fafbfd] transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[22px] font-semibold tracking-tight">Audit {audit.id.toUpperCase()}</h1>
            <StatusBadge status={audit.status} />
            <SeverityBadge priority={audit.priority} />
          </div>
          <p className="text-[13px] text-muted-foreground">
            {store?.name} · {dept?.name} · {cat?.name}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column - Image + Zones */}
        <div className="lg:col-span-2 space-y-5">
          <AuditImageViewer
            imageUrl={audit.imageUrl}
            annotatedImageUrl={audit.annotatedImageUrl}
          />
          <ZoneList zones={audit.emptyZones} />
        </div>

        {/* Right column - Info + Metrics */}
        <div className="space-y-5">
          {/* Metrics Card */}
          <div className="rounded-2xl border border-[#e2e9f2] bg-white overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[#f0f3f7] px-5 py-3.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#f0f3f7]">
                <BarChart3 className="h-3.5 w-3.5 text-primary" />
              </div>
              <h3 className="text-[14px] font-semibold">Métriques</h3>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-[#f0f3f7] p-3 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Score</p>
                  <p className={`text-2xl font-bold tabular-nums ${scoreColor}`}>{audit.metrics.score}</p>
                </div>
                <div className="rounded-xl bg-[#f0f3f7] p-3 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Fill Rate</p>
                  <p className="text-2xl font-bold tabular-nums">{audit.metrics.fillRate}%</p>
                </div>
                <div className="rounded-xl bg-[#f0f3f7] p-3 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Zones vides</p>
                  <p className="text-xl font-bold tabular-nums">{audit.metrics.emptyZonesCount}</p>
                </div>
                <div className="rounded-xl bg-[#f0f3f7] p-3 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Anomalies</p>
                  <p className="text-xl font-bold tabular-nums">{audit.metrics.anomaliesCount}</p>
                </div>
              </div>
              {audit.metrics.complianceRate !== undefined && (
                <div className="flex justify-between text-[13px] border-t border-[#f0f3f7] pt-3">
                  <span className="text-muted-foreground">Conformité</span>
                  <span className="font-medium tabular-nums">{audit.metrics.complianceRate}%</span>
                </div>
              )}
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">Confiance IA</span>
                <span className="font-medium tabular-nums">{Math.round(audit.metrics.confidence * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="rounded-2xl border border-[#e2e9f2] bg-white overflow-hidden">
            <div className="border-b border-[#f0f3f7] px-5 py-3.5">
              <h3 className="text-[14px] font-semibold">Informations</h3>
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
                <Tag className="h-4 w-4 text-muted-foreground/60" />
                <span className="text-muted-foreground">Catégorie :</span>
                <span className="font-medium">{cat?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground/60" />
                <span className="text-muted-foreground">Merchandiser :</span>
                <span className="font-medium">{user?.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground/60" />
                <span className="text-muted-foreground">Date :</span>
                <span className="font-medium">{format(new Date(audit.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}</span>
              </div>
              <div className="text-[11px] text-muted-foreground pt-2 border-t border-[#f0f3f7]">
                Type : {audit.type === 'empty_shelves' ? 'Empty Shelves' : 'Standard'} · Analyse : {audit.analysisType === 'ai_api' ? 'IA API' : 'Simulation locale'}
              </div>
            </div>
          </div>

          {/* Comment */}
          {audit.comment && (
            <div className="rounded-2xl border border-[#e2e9f2] bg-white overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[#f0f3f7] px-5 py-3.5">
                <MessageSquare className="h-4 w-4 text-muted-foreground/60" />
                <h3 className="text-[14px] font-semibold">Commentaire</h3>
              </div>
              <div className="p-5">
                <p className="text-[13px]">{audit.comment}</p>
              </div>
            </div>
          )}

          {/* Validation */}
          {audit.validationComment && (
            <div className="rounded-2xl border border-[#e2e9f2] bg-white overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[#f0f3f7] px-5 py-3.5">
                {audit.status === 'validated' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <h3 className="text-[14px] font-semibold">Validation</h3>
              </div>
              <div className="p-5">
                <p className="text-[13px]">{audit.validationComment}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions correctives */}
      {actions.length > 0 && (
        <CorrectiveActionsPanel
          actions={actions}
          basePath="/chef-rayon/actions"
          maxItems={10}
        />
      )}
    </div>
  );
}
