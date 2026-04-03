'use client';

import { KPIStatCard } from '@/components/dashboard/kpi-stat-card';
import { DashboardSection } from '@/components/dashboard/dashboard-section';
import { RecentAlertsList } from '@/components/dashboard/recent-alerts-list';
import { CorrectiveActionsPanel } from '@/components/dashboard/corrective-actions-panel';
import { TrendCard } from '@/components/dashboard/trend-card';
import { AuditTable } from '@/components/dashboard/audit-table';
import { mockAudits, mockActions, mockAuditTrend7d } from '@/data/mock-data';
import { useAuth } from '@/hooks/use-auth';
import {
  ClipboardCheck,
  AlertTriangle,
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function ChefRayonDashboard() {
  const { user } = useAuth();
  const todayAudits = mockAudits.filter(a => a.createdAt.startsWith('2026-04-03'));
  const criticalAnomalies = mockAudits.filter(a => a.priority === 'critical' || (a.priority === 'high' && a.status !== 'validated'));
  const openActions = mockActions.filter(a => a.status === 'todo' || a.status === 'in_progress');
  const correctedActions = mockActions.filter(a => a.status === 'corrected' || a.status === 'to_validate');
  const pendingAudits = mockAudits.filter(a => a.status === 'pending');
  const correctionRate = mockActions.length > 0 ? Math.round((correctedActions.length / mockActions.length) * 100) : 0;

  const recentAudits = [...mockAudits]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const firstName = user?.fullName?.split(' ')[0] || 'Chef';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-foreground">
            Bonjour, {firstName} <span className="inline-block animate-[wave_2s_ease-in-out_infinite] origin-[70%_70%]">👋</span>
          </h1>
          <p className="text-[13px] text-muted-foreground mt-1">Voici l&apos;état de vos rayons aujourd&apos;hui</p>
        </div>
        <Link
          href="/chef-rayon/audits"
          className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Voir tous les audits <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPIStatCard
          label="Audits du jour"
          value={todayAudits.length}
          change={20}
          changeLabel="vs hier"
          trend="up"
          icon={ClipboardCheck}
          iconColor="text-blue-600"
        />
        <KPIStatCard
          label="Anomalies critiques"
          value={criticalAnomalies.length}
          trend="down"
          change={-15}
          changeLabel="vs sem. dernière"
          icon={AlertTriangle}
          iconColor="text-red-500"
        />
        <KPIStatCard
          label="Actions ouvertes"
          value={openActions.length}
          icon={Wrench}
          iconColor="text-amber-500"
        />
        <KPIStatCard
          label="Taux de correction"
          value={`${correctionRate}%`}
          trend="up"
          change={8}
          icon={CheckCircle2}
          iconColor="text-green-600"
        />
        <KPIStatCard
          label="En attente"
          value={pendingAudits.length}
          icon={Clock}
          iconColor="text-purple-500"
        />
      </div>

      {/* Charts + Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TrendCard
          title="Audits — 7 derniers jours"
          data={mockAuditTrend7d}
          color="#6366f1"
        />
        <RecentAlertsList
          audits={mockAudits}
          basePath="/chef-rayon/audits"
        />
      </div>

      {/* Actions + Recent Audits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CorrectiveActionsPanel
          actions={mockActions}
          basePath="/chef-rayon/actions"
        />
        <DashboardSection
          title="Audits récents"
          action={
            <Link href="/chef-rayon/audits" className="text-[12px] font-medium text-primary hover:text-primary/80 transition-colors">
              Tout voir →
            </Link>
          }
        >
          <AuditTable audits={recentAudits} basePath="/chef-rayon/audits" />
        </DashboardSection>
      </div>
    </div>
  );
}
