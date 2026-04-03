'use client';

import { KPIStatCard } from '@/components/dashboard/kpi-stat-card';
import { DashboardSection } from '@/components/dashboard/dashboard-section';
import { RecentAlertsList } from '@/components/dashboard/recent-alerts-list';
import { CorrectiveActionsPanel } from '@/components/dashboard/corrective-actions-panel';
import { TrendCard } from '@/components/dashboard/trend-card';
import { AuditTable } from '@/components/dashboard/audit-table';
import { mockAudits, mockActions, mockAuditTrend7d, getStore } from '@/data/mock-data';
import { useAuth } from '@/hooks/use-auth';
import {
  ClipboardCheck,
  AlertTriangle,
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  TrendingDown,
  RotateCcw,
  MapPin,
  Zap,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ChefRayonDashboard() {
  const { user } = useAuth();
  const todayAudits = mockAudits.filter(a => a.createdAt.startsWith('2026-04-03'));
  const criticalAnomalies = mockAudits.filter(a => a.priority === 'critical' || (a.priority === 'high' && a.status !== 'validated'));
  const openActions = mockActions.filter(a => a.status === 'todo' || a.status === 'in_progress');
  const correctedActions = mockActions.filter(a => a.status === 'corrected' || a.status === 'to_validate');
  const pendingAudits = mockAudits.filter(a => a.status === 'pending');
  const correctionRate = mockActions.length > 0 ? Math.round((correctedActions.length / mockActions.length) * 100) : 0;
  const avgScore = Math.round(mockAudits.reduce((s, a) => s + a.metrics.score, 0) / mockAudits.length);

  const recentAudits = [...mockAudits]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const todayActions = mockActions
    .filter(a => (a.status === 'todo' || a.status === 'in_progress') && (a.priority === 'critical' || a.priority === 'high'))
    .sort((a, b) => {
      const p = { critical: 0, high: 1, medium: 2, low: 3 };
      return p[a.priority] - p[b.priority];
    })
    .slice(0, 4);

  const beforeAfter = [
    { label: 'Lait Jaouda 1L — Marjane Hay Riad', before: 74, after: 89 },
    { label: 'Tête de gondole biscuits — Carrefour Maârif', before: 68, after: 85 },
  ];

  const problemZones = [
    { dept: 'Frais & Produits laitiers', store: 'Carrefour Maârif', score: 32, anomalies: 8 },
    { dept: 'Épicerie sucrée', store: 'Marjane Ain Diab', score: 48, anomalies: 6 },
    { dept: 'Thé & Café', store: 'Aswak Assalam Tanger', score: 51, anomalies: 5 },
    { dept: 'Boissons', store: 'Carrefour Agdal', score: 55, anomalies: 4 },
  ];

  const firstName = user?.fullName?.split(' ')[0] || 'Chef';

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Header with gradient accent */}
      <div className="relative rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 p-6 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="relative flex items-end justify-between">
          <div>
            <h1 className="text-[26px] font-bold tracking-tight">
              Bonjour, {firstName}
            </h1>
            <p className="text-white/80 text-[14px] mt-1">
              Pilotage opérationnel — {format(new Date(), 'EEEE d MMMM yyyy', { locale: fr })}
            </p>
          </div>
          <Link
            href="/chef-rayon/audits"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-white/90 bg-white/15 hover:bg-white/25 rounded-xl px-4 py-2 backdrop-blur-sm transition-all"
          >
            Voir tous les audits <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPIStatCard label="Audits du jour" value={todayAudits.length} change={20} changeLabel="vs hier" trend="up" icon={ClipboardCheck} iconColor="text-sky-600" />
        <KPIStatCard label="Anomalies critiques" value={criticalAnomalies.length} trend="down" change={-15} changeLabel="vs sem." icon={AlertTriangle} iconColor="text-red-500" />
        <KPIStatCard label="Actions ouvertes" value={openActions.length} icon={Wrench} iconColor="text-amber-500" />
        <KPIStatCard label="Taux correction" value={`${correctionRate}%`} trend="up" change={8} icon={CheckCircle2} iconColor="text-green-600" />
        <KPIStatCard label="Score moyen" value={avgScore} trend="up" change={5} changeLabel="vs sem." icon={Target} iconColor="text-cyan-600" />
        <KPIStatCard label="En attente" value={pendingAudits.length} icon={Clock} iconColor="text-purple-500" />
      </div>

      {/* Priorities + Problem Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Today Priorities */}
        <div className="rounded-2xl border border-sky-100/60 bg-white">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-sky-50">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
              <Zap className="h-3.5 w-3.5 text-red-500" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-foreground">Priorités du jour</h3>
              <p className="text-[11px] text-muted-foreground">Actions nécessitant une intervention immédiate</p>
            </div>
          </div>
          <div className="divide-y divide-sky-50">
            {todayActions.map((action) => {
              const store = getStore(action.storeId);
              return (
                <Link key={action.id} href={`/chef-rayon/actions/${action.id}`} className="group flex items-start gap-3 px-5 py-3.5 hover:bg-sky-50/30 transition-colors">
                  <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full shrink-0 ${action.priority === 'critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                    <ShieldAlert className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">{action.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${action.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                        {action.priority === 'critical' ? 'Critique' : 'Haute'}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{store?.name}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-red-500 transition-colors mt-1 shrink-0" />
                </Link>
              );
            })}
            {todayActions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle2 className="h-8 w-8 text-emerald-400 mb-2" />
                <p className="text-[13px] text-muted-foreground">Aucune priorité urgente</p>
              </div>
            )}
          </div>
        </div>

        {/* Problem Zones */}
        <div className="rounded-2xl border border-sky-100/60 bg-white">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-sky-50">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50">
              <TrendingDown className="h-3.5 w-3.5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-foreground">Zones les plus dégradées</h3>
              <p className="text-[11px] text-muted-foreground">Rayons nécessitant une attention prioritaire</p>
            </div>
          </div>
          <div className="divide-y divide-sky-50">
            {problemZones.map((zone, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-sky-50/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-[12px] font-bold shrink-0 ${zone.score < 40 ? 'bg-red-50 text-red-700' : zone.score < 60 ? 'bg-amber-50 text-amber-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    {zone.score}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{zone.dept}</p>
                    <p className="text-[11px] text-muted-foreground">{zone.store}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[12px] text-red-600 font-semibold">
                  <AlertTriangle className="h-3 w-3" />{zone.anomalies} anomalies
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before/After + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-sky-100/60 bg-white">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-sky-50">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
              <RotateCcw className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-foreground">Avant / Après correction</h3>
              <p className="text-[11px] text-muted-foreground">Progressions suite aux actions correctives</p>
            </div>
          </div>
          <div className="divide-y divide-sky-50">
            {beforeAfter.map((item, i) => (
              <div key={i} className="px-5 py-4">
                <p className="text-[13px] font-medium text-foreground mb-3">{item.label}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-[11px] text-muted-foreground w-12 shrink-0">Avant</span>
                    <div className="flex-1 h-2.5 bg-sky-50 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: `${item.before}%` }} />
                    </div>
                    <span className="text-[13px] font-bold text-red-600 w-10 text-right tabular-nums">{item.before}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-[11px] text-muted-foreground w-12 shrink-0">Après</span>
                    <div className="flex-1 h-2.5 bg-sky-50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.after}%` }} />
                    </div>
                    <span className="text-[13px] font-bold text-emerald-600 w-10 text-right tabular-nums">{item.after}</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" />+{item.after - item.before} points
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <TrendCard title="Évolution des audits — 7 derniers jours" data={mockAuditTrend7d} color="#0ea5e9" />
      </div>

      {/* Alerts + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentAlertsList audits={mockAudits} basePath="/chef-rayon/audits" />
        <CorrectiveActionsPanel actions={mockActions} basePath="/chef-rayon/actions" />
      </div>

      {/* Recent audits */}
      <DashboardSection
        title="Audits récents du périmètre"
        description="Derniers audits réalisés sur vos magasins"
        action={<Link href="/chef-rayon/audits" className="text-[12px] font-medium text-sky-600 hover:text-sky-500 transition-colors">Tout voir →</Link>}
      >
        <AuditTable audits={recentAudits} basePath="/chef-rayon/audits" />
      </DashboardSection>
    </div>
  );
}