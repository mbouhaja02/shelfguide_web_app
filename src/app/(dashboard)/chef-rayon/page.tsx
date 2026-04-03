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

  // Time-aware greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header — warm, human, no gradient banner */}
      <div className="animate-fade-in">
        <div className="flex items-end justify-between mb-1">
          <div>
            <h1 className="text-[22px] lg:text-[26px] font-bold tracking-tight text-foreground font-[var(--font-heading)]">
              {greeting}, {firstName} 👋
            </h1>
            <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">
              {format(new Date(), 'EEEE d MMMM yyyy', { locale: fr })} · <span className="text-foreground/70 font-medium">{todayAudits.length} audits aujourd&apos;hui</span>
            </p>
          </div>
          <Link
            href="/chef-rayon/audits"
            className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            Tous les audits <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        {/* Subtle warm accent line — asymmetric, not a perfect gradient */}
        <div className="h-[3px] w-16 rounded-full bg-primary mt-3 opacity-60" />
      </div>

      {/* KPIs — staggered animation */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4">
        <KPIStatCard index={0} label="Audits du jour" value={todayAudits.length} change={20} changeLabel="vs hier" trend="up" icon={ClipboardCheck} iconColor="text-primary" />
        <KPIStatCard index={1} label="Anomalies critiques" value={criticalAnomalies.length} trend="down" change={-15} changeLabel="vs sem." icon={AlertTriangle} iconColor="text-red-500" />
        <KPIStatCard index={2} label="Actions ouvertes" value={openActions.length} icon={Wrench} iconColor="text-amber-500" />
        <KPIStatCard index={3} label="Taux correction" value={`${correctionRate}%`} trend="up" change={8} icon={CheckCircle2} iconColor="text-green-600" />
        <KPIStatCard index={4} label="Score moyen" value={avgScore} trend="up" change={5} changeLabel="vs sem." icon={Target} iconColor="text-cyan-600" />
        <KPIStatCard index={5} label="En attente" value={pendingAudits.length} icon={Clock} iconColor="text-purple-500" />
      </div>

      {/* Priorities + Problem Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        {/* Today Priorities — accent left border for urgency */}
        <div className="card-base card-accent-left animate-slide-up stagger-1" style={{ borderLeftColor: '#e74c3c' }}>
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#f0f3f7]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50/80">
              <Zap className="h-3.5 w-3.5 text-red-500" />
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-foreground">Priorités du jour</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Intervention immédiate requise</p>
            </div>
          </div>
          <div className="divide-y divide-[#f4f7fb]">
            {todayActions.map((action) => {
              const store = getStore(action.storeId);
              return (
                <Link key={action.id} href={`/chef-rayon/actions/${action.id}`} className="group flex items-start gap-3 px-5 py-3.5 hover:bg-[#fafbfd] transition-colors">
                  <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full shrink-0 ${action.priority === 'critical' ? 'bg-red-100/80 text-red-600' : 'bg-orange-100/80 text-orange-600'}`}>
                    <ShieldAlert className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate group-hover:text-primary transition-colors">{action.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${action.priority === 'critical' ? 'bg-red-100/80 text-red-700' : 'bg-orange-100/80 text-orange-700'}`}>
                        {action.priority === 'critical' ? 'Critique' : 'Haute'}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{store?.name}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
                </Link>
              );
            })}
            {todayActions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle2 className="h-7 w-7 text-emerald-400 mb-2" />
                <p className="text-[12px] text-muted-foreground">Aucune priorité urgente</p>
              </div>
            )}
          </div>
        </div>

        {/* Problem Zones */}
        <div className="card-base animate-slide-up stagger-2">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#f0f3f7]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50/80">
              <TrendingDown className="h-3.5 w-3.5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-foreground">Zones dégradées</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Attention prioritaire requise</p>
            </div>
          </div>
          <div className="divide-y divide-[#f4f7fb]">
            {problemZones.map((zone, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-[#fafbfd] transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold shrink-0 ${zone.score < 40 ? 'bg-red-50/80 text-red-700' : zone.score < 60 ? 'bg-amber-50/80 text-amber-700' : 'bg-yellow-50/80 text-yellow-700'}`}>
                    {zone.score}
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-foreground">{zone.dept}</p>
                    <p className="text-[10px] text-muted-foreground">{zone.store}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] text-red-600 font-semibold">
                  <AlertTriangle className="h-3 w-3" />{zone.anomalies}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before/After + Trend — asymmetric widths */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5">
        <div className="lg:col-span-3 card-base animate-slide-up stagger-3">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#f0f3f7]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50/80">
              <RotateCcw className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <h3 className="text-[13px] font-semibold text-foreground">Avant / Après correction</h3>
          </div>
          <div className="divide-y divide-[#f4f7fb]">
            {beforeAfter.map((item, i) => (
              <div key={i} className="px-5 py-4">
                <p className="text-[12px] font-medium text-foreground mb-3">{item.label}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-[10px] text-muted-foreground w-10 shrink-0">Avant</span>
                    <div className="flex-1 h-2 bg-[#f0f3f7] rounded-full overflow-hidden">
                      <div className="h-full bg-red-400/80 rounded-full transition-all duration-700" style={{ width: `${item.before}%` }} />
                    </div>
                    <span className="text-[12px] font-bold text-red-600 w-8 text-right tabular-nums">{item.before}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-[10px] text-muted-foreground w-10 shrink-0">Après</span>
                    <div className="flex-1 h-2 bg-[#f0f3f7] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${item.after}%` }} />
                    </div>
                    <span className="text-[12px] font-bold text-emerald-600 w-8 text-right tabular-nums">{item.after}</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50/80 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                    +{item.after - item.before} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <TrendCard title="Évolution — 7 jours" data={mockAuditTrend7d} color="#2d9cdb" />
        </div>
      </div>

      {/* Alerts + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        <RecentAlertsList audits={mockAudits} basePath="/chef-rayon/audits" />
        <CorrectiveActionsPanel actions={mockActions} basePath="/chef-rayon/actions" />
      </div>

      {/* Recent audits */}
      <DashboardSection
        title="Audits récents"
        description="Derniers audits réalisés sur vos magasins"
        action={<Link href="/chef-rayon/audits" className="text-[11px] font-medium text-primary hover:text-primary/70 transition-colors">Tout voir →</Link>}
      >
        <AuditTable audits={recentAudits} basePath="/chef-rayon/audits" />
      </DashboardSection>
    </div>
  );
}