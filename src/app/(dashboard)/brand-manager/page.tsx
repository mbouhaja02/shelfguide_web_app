'use client';

import { KPIStatCard } from '@/components/dashboard/kpi-stat-card';
import { DashboardSection } from '@/components/dashboard/dashboard-section';
import { TrendCard } from '@/components/dashboard/trend-card';
import { StorePerformanceTable } from '@/components/dashboard/store-performance-table';
import { BarChartCard } from '@/components/dashboard/charts';
import {
  mockBrandPerformances,
  mockStorePerformances,
  mockComplianceTrend30d,
  mockAnomaliesByCategory,
  mockAuditTrend7d,
} from '@/data/mock-data';
import {
  ClipboardCheck,
  TrendingUp,
  PackageX,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  AlertTriangle,
  Trophy,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BrandManagerDashboard() {
  const brand = mockBrandPerformances[0];

  const riskyStores = [...mockStorePerformances]
    .sort((a, b) => a.globalScore - b.globalScore)
    .slice(0, 3);

  const topStores = [...mockStorePerformances]
    .sort((a, b) => b.globalScore - a.globalScore)
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[22px] font-bold tracking-tight text-foreground">Vue globale</h1>
            <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-[12px] font-semibold text-indigo-700">{brand.brandName}</span>
          </div>
          <p className="text-[13px] text-muted-foreground">Performance de votre marque sur l&apos;ensemble des points de vente</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPIStatCard
          label="Audits totaux"
          value={brand.totalAudits}
          change={12}
          changeLabel="vs mois"
          trend="up"
          icon={ClipboardCheck}
          iconColor="text-blue-600"
        />
        <KPIStatCard
          label="Conformité"
          value={`${brand.complianceRate}%`}
          change={3}
          trend="up"
          icon={ShieldCheck}
          iconColor="text-green-600"
        />
        <KPIStatCard
          label="Disponibilité"
          value={`${brand.availabilityRate}%`}
          change={2}
          trend="up"
          icon={TrendingUp}
          iconColor="text-emerald-600"
        />
        <KPIStatCard
          label="Ruptures"
          value={`${brand.ruptureRate}%`}
          change={-5}
          trend="down"
          icon={PackageX}
          iconColor="text-red-500"
        />
        <KPIStatCard
          label="Correction"
          value={`${brand.correctionRate}%`}
          change={8}
          trend="up"
          icon={CheckCircle2}
          iconColor="text-purple-500"
        />
        <KPIStatCard
          label="Fill Rate"
          value={`${brand.fillRate}%`}
          change={4}
          trend="up"
          icon={BarChart3}
          iconColor="text-indigo-600"
        />
      </div>

      {/* Trends */}
      <Tabs defaultValue="30d" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-foreground">Tendances</h2>
          <TabsList className="h-8">
            <TabsTrigger value="7d" className="text-[11px] h-6 px-3">7 jours</TabsTrigger>
            <TabsTrigger value="30d" className="text-[11px] h-6 px-3">30 jours</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="7d">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <TrendCard title="Audits réalisés — 7 jours" data={mockAuditTrend7d} color="#6366f1" />
            <BarChartCard title="Anomalies par catégorie" data={mockAnomaliesByCategory} color="#f59e0b" />
          </div>
        </TabsContent>
        <TabsContent value="30d">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <TrendCard title="Taux de conformité — 30 jours" data={mockComplianceTrend30d} color="#22c55e" unit="%" />
            <BarChartCard title="Anomalies par catégorie" data={mockAnomaliesByCategory} color="#f59e0b" />
          </div>
        </TabsContent>
      </Tabs>

      {/* Risk & Top Stores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-border/60 bg-white">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border/40">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
              <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
            </div>
            <h3 className="text-[13px] font-semibold text-foreground">Magasins à risque</h3>
          </div>
          <div className="divide-y divide-border/30">
            {riskyStores.map((store) => (
              <div key={store.storeId} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/80 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[11px] font-bold text-red-600 shrink-0">
                    {store.storeName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{store.storeName}</p>
                    <p className="text-[11px] text-muted-foreground">{store.retailer} · {store.region}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="text-[11px] text-muted-foreground">{store.ruptures} ruptures</p>
                  </div>
                  <span className={`inline-flex items-center justify-center h-8 w-8 rounded-lg text-[13px] font-bold ${
                    store.globalScore < 60 ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {store.globalScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-white">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border/40">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
              <Trophy className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <h3 className="text-[13px] font-semibold text-foreground">Magasins performants</h3>
          </div>
          <div className="divide-y divide-border/30">
            {topStores.map((store, i) => (
              <div key={store.storeId} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/80 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[11px] font-bold text-emerald-700 shrink-0">
                    #{i + 1}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{store.storeName}</p>
                    <p className="text-[11px] text-muted-foreground">{store.retailer} · {store.region}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="text-[11px] text-muted-foreground">{store.auditsCount} audits</p>
                  </div>
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 text-[13px] font-bold">
                    {store.globalScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Store Table */}
      <DashboardSection
        title="Vue multi-magasins"
        description="Performance de tous les points de vente"
      >
        <StorePerformanceTable stores={mockStorePerformances} />
      </DashboardSection>
    </div>
  );
}
