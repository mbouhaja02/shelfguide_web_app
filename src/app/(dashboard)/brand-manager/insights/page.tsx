'use client';

import { KPIStatCard } from '@/components/dashboard/kpi-stat-card';
import { DashboardSection } from '@/components/dashboard/dashboard-section';
import { TrendCard } from '@/components/dashboard/trend-card';
import { BarChartCard, PieChartCard } from '@/components/dashboard/charts';
import {
  mockComplianceTrend30d,
  mockAnomaliesByCategory,
  mockStorePerformances,
  mockActionStatusDistribution,
  mockBrandPerformances,
} from '@/data/mock-data';
import { Lightbulb, TrendingDown, AlertTriangle, Target } from 'lucide-react';

export default function BrandInsightsPage() {
  const brand = mockBrandPerformances[0];

  // Under-performing stores
  const underPerforming = mockStorePerformances.filter(s => s.globalScore < 65);

  // Recommendations
  const recommendations = [
    {
      title: 'Augmenter la fréquence d\'audit à Carrefour Anfa',
      description: 'Ce magasin présente un score de 52 avec 5 ruptures. Recommandation : passer à 2 audits par semaine.',
      severity: 'high' as const,
    },
    {
      title: 'Renforcer le suivi produits laitiers',
      description: 'La catégorie « Produits laitiers » concentre 40% des anomalies. Priorité d\'action recommandée.',
      severity: 'high' as const,
    },
    {
      title: 'Optimiser le réassort Marjane Agdal',
      description: 'Le délai de correction moyen est de 6.7h, au-dessus de l\'objectif de 4h. Revoir le processus interne.',
      severity: 'medium' as const,
    },
    {
      title: 'Consolider la performance à Tanger',
      description: 'Aswak Assalam Tanger affiche le meilleur score (87). Modèle à répliquer dans d\'autres enseignes.',
      severity: 'low' as const,
    },
  ];

  // Temporal evolution data
  const availabilityTrend = [
    { date: '2026-03-05', value: 70 },
    { date: '2026-03-08', value: 72 },
    { date: '2026-03-11', value: 74 },
    { date: '2026-03-14', value: 71 },
    { date: '2026-03-17', value: 75 },
    { date: '2026-03-20', value: 73 },
    { date: '2026-03-23', value: 77 },
    { date: '2026-03-26', value: 74 },
    { date: '2026-03-29', value: 79 },
    { date: '2026-04-01', value: 76 },
    { date: '2026-04-03', value: 74 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Insights</h1>
        <p className="text-[13px] text-muted-foreground">Analyse avancée et recommandations pour votre marque</p>
      </div>

      {/* Key insight KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPIStatCard
          label="Magasins sous-performants"
          value={underPerforming.length}
          icon={TrendingDown}
          iconColor="text-red-500"
        />
        <KPIStatCard
          label="Catégories touchées"
          value={mockAnomaliesByCategory.filter(c => c.count > 3).length}
          icon={AlertTriangle}
          iconColor="text-amber-500"
        />
        <KPIStatCard
          label="Score moyen global"
          value={Math.round(mockStorePerformances.reduce((s, p) => s + p.globalScore, 0) / mockStorePerformances.length)}
          icon={Target}
          iconColor="text-blue-600"
        />
        <KPIStatCard
          label="Recommandations actives"
          value={recommendations.length}
          icon={Lightbulb}
          iconColor="text-purple-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TrendCard
          title="Évolution de la disponibilité — 30 jours"
          data={availabilityTrend}
          color="#0ea5e9"
          unit="%"
        />
        <TrendCard
          title="Conformité globale — 30 jours"
          data={mockComplianceTrend30d}
          color="#22c55e"
          unit="%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BarChartCard
          title="Anomalies par catégorie"
          data={mockAnomaliesByCategory}
          color="#ef4444"
        />
        <PieChartCard
          title="Répartition des actions correctives"
          data={mockActionStatusDistribution}
        />
      </div>

      {/* Recommendations */}
      <DashboardSection
        title="Recommandations d'action"
        description="Suggestions basées sur l'analyse des données récentes"
      >
        <div className="space-y-3">
          {recommendations.map((rec, i) => {
            const severityBorder = {
              high: 'border-l-red-500',
              medium: 'border-l-amber-500',
              low: 'border-l-green-500',
            };
            return (
              <div key={i} className={`rounded-2xl border border-sky-100/60 border-l-4 ${severityBorder[rec.severity]} bg-white p-4 hover:shadow-md hover:shadow-black/[0.04] transition-all`}>
                <div className="flex items-start gap-3">
                  <Lightbulb className={`h-5 w-5 mt-0.5 shrink-0 ${
                    rec.severity === 'high' ? 'text-red-500' : rec.severity === 'medium' ? 'text-amber-500' : 'text-green-500'
                  }`} />
                  <div>
                    <h4 className="text-[13px] font-semibold mb-0.5">{rec.title}</h4>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{rec.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DashboardSection>

      {/* Under-performing stores */}
      <DashboardSection
        title="Magasins sous-performants"
        description="Points de vente avec un score inférieur à 65"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {underPerforming.map((store) => (
            <div key={store.storeId} className="rounded-2xl border border-sky-100/60 bg-white p-5 hover:shadow-md hover:shadow-black/[0.04] transition-all">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-[14px] font-semibold">{store.storeName}</h4>
                  <p className="text-[11px] text-muted-foreground">{store.retailer} · {store.region}</p>
                </div>
                <span className="text-2xl font-bold tabular-nums text-red-600">{store.globalScore}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-sky-50/50/80 p-2">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Anomalies</p>
                  <p className="font-bold text-[14px] tabular-nums">{store.anomalies}</p>
                </div>
                <div className="rounded-xl bg-sky-50/50/80 p-2">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Ruptures</p>
                  <p className="font-bold text-[14px] tabular-nums text-red-600">{store.ruptures}</p>
                </div>
                <div className="rounded-xl bg-sky-50/50/80 p-2">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Délai (h)</p>
                  <p className="font-bold text-[14px] tabular-nums">{store.avgCorrectionDelay}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
