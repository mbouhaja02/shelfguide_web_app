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
  mockTopRupturedProducts,
  mockBrandByStore,
  mockWeeklyExecution,
} from '@/data/mock-data';
import {
  ClipboardCheck,
  TrendingUp,
  TrendingDown,
  PackageX,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  AlertTriangle,
  Trophy,
  MapPin,
  Package,
  ArrowRight,
  Target,
  Activity,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function BrandManagerDashboard() {
  const { user } = useAuth();
  const brand = mockBrandPerformances[0];
  const weekly = mockWeeklyExecution;

  const riskyStores = [...mockStorePerformances]
    .sort((a, b) => a.globalScore - b.globalScore)
    .slice(0, 4);

  const topStores = [...mockStorePerformances]
    .sort((a, b) => b.globalScore - a.globalScore)
    .slice(0, 4);

  const firstName = user?.fullName?.split(' ')[0] || '';

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[24px] font-bold tracking-tight text-foreground">Pilotage {brand.brandName}</h1>
            <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-[12px] font-semibold text-indigo-700">Brand Manager</span>
          </div>
          <p className="text-[14px] text-muted-foreground">
            Performance d&apos;exécution terrain — {format(new Date(), 'MMMM yyyy', { locale: fr })} · 12 magasins au Maroc
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPIStatCard label="Audits réalisés" value={brand.totalAudits} change={12} changeLabel="vs mois" trend="up" icon={ClipboardCheck} iconColor="text-blue-600" />
        <KPIStatCard label="Conformité" value={`${brand.complianceRate}%`} change={3} trend="up" icon={ShieldCheck} iconColor="text-green-600" />
        <KPIStatCard label="Disponibilité" value={`${brand.availabilityRate}%`} change={2} trend="up" icon={TrendingUp} iconColor="text-emerald-600" />
        <KPIStatCard label="Taux de rupture" value={`${brand.ruptureRate}%`} change={-5} trend="down" icon={PackageX} iconColor="text-red-500" />
        <KPIStatCard label="Taux correction" value={`${brand.correctionRate}%`} change={8} trend="up" icon={CheckCircle2} iconColor="text-purple-500" />
        <KPIStatCard label="Fill Rate" value={`${brand.fillRate}%`} change={4} trend="up" icon={BarChart3} iconColor="text-indigo-600" />
      </div>

      {/* Weekly Execution Summary */}
      <div className="rounded-xl border border-border/60 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
            <Activity className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <h3 className="text-[14px] font-semibold text-foreground">Exécution terrain cette semaine</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-slate-50 p-3.5">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Audits réalisés</p>
            <p className="text-[22px] font-bold text-foreground mt-1">{weekly.totalAudits}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3.5">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Score moyen</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-[22px] font-bold text-foreground">{weekly.avgScore}</p>
              <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${weekly.avgScoreChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {weekly.avgScoreChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {weekly.avgScoreChange > 0 ? '+' : ''}{weekly.avgScoreChange}
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-emerald-50 p-3.5">
            <p className="text-[11px] text-emerald-700 uppercase tracking-wider font-medium">Corrections</p>
            <p className="text-[22px] font-bold text-emerald-700 mt-1">{weekly.correctedActions}</p>
            <p className="text-[11px] text-emerald-600/70 mt-0.5">{weekly.pendingActions} en attente</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-3.5">
            <p className="text-[11px] text-amber-700 uppercase tracking-wider font-medium">Catégorie sensible</p>
            <p className="text-[14px] font-bold text-amber-800 mt-1">{weekly.topAnomalyCategory}</p>
            <p className="text-[11px] text-amber-600/70 mt-0.5">Plus d&apos;anomalies cette semaine</p>
          </div>
        </div>
      </div>

      {/* Top Ruptured Products */}
      <div className="rounded-xl border border-border/60 bg-white">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border/40">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
            <Package className="h-3.5 w-3.5 text-red-500" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">Produits les plus touchés par les ruptures</h3>
            <p className="text-[11px] text-muted-foreground">Impact sur le réseau de distribution</p>
          </div>
        </div>
        <div className="divide-y divide-border/30">
          {mockTopRupturedProducts.map((product, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-red-50/20 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 text-[11px] font-bold ${
                  product.impact === 'critical' ? 'bg-red-100 text-red-700' : product.impact === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {product.stores}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-foreground truncate">{product.product}</p>
                  <p className="text-[11px] text-muted-foreground">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[12px] text-muted-foreground">{product.stores}/{product.totalStores} magasins</p>
                </div>
                <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${product.impact === 'critical' ? 'bg-red-500' : product.impact === 'high' ? 'bg-orange-500' : 'bg-amber-400'}`} style={{ width: `${(product.stores / product.totalStores) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trends */}
      <Tabs defaultValue="30d" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-foreground">Évolution de la conformité</h2>
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
            <div>
              <h3 className="text-[14px] font-semibold text-foreground">Magasins à risque</h3>
              <p className="text-[11px] text-muted-foreground">Points de vente nécessitant un suivi renforcé</p>
            </div>
          </div>
          <div className="divide-y divide-border/30">
            {riskyStores.map((store) => (
              <div key={store.storeId} className="flex items-center justify-between px-5 py-3.5 hover:bg-red-50/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-[12px] font-bold shrink-0 ${store.globalScore < 60 ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                    {store.globalScore}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{store.storeName}</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{store.retailer} · {store.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[12px] text-red-600 font-semibold">{store.ruptures} ruptures</span>
                  <p className="text-[11px] text-muted-foreground">{store.anomalies} anomalies</p>
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
            <div>
              <h3 className="text-[14px] font-semibold text-foreground">Magasins performants</h3>
              <p className="text-[11px] text-muted-foreground">Meilleure exécution merchandising</p>
            </div>
          </div>
          <div className="divide-y divide-border/30">
            {topStores.map((store, i) => (
              <div key={store.storeId} className="flex items-center justify-between px-5 py-3.5 hover:bg-emerald-50/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[11px] font-bold text-emerald-700 shrink-0">
                    #{i + 1}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{store.storeName}</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{store.retailer} · {store.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 text-[13px] font-bold">{store.globalScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance by Store (brand-specific) */}
      <div className="rounded-xl border border-border/60 bg-white">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border/40">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
            <Target className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">Performance {brand.brandName} par magasin</h3>
            <p className="text-[11px] text-muted-foreground">Écarts de performance entre points de vente</p>
          </div>
        </div>
        <div className="divide-y divide-border/30">
          {mockBrandByStore.slice(0, 6).map((store) => (
            <div key={store.storeId} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50/80 transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold shrink-0 ${
                  store.score >= 80 ? 'bg-emerald-50 text-emerald-700' : store.score >= 60 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                }`}>{store.score}</div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-foreground truncate">{store.storeName}</p>
                  <p className="text-[11px] text-muted-foreground">{store.city} · {store.retailer}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[12px] tabular-nums">{store.ruptures} ruptures · {store.audits} audits</p>
                </div>
                <div className="flex items-center gap-1">
                  {store.trend === 'up' && <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />}
                  {store.trend === 'down' && <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
                  {store.trend === 'stable' && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Store Table */}
      <DashboardSection title="Vue multi-magasins" description="Performance de tous les points de vente du réseau">
        <StorePerformanceTable stores={mockStorePerformances} />
      </DashboardSection>
    </div>
  );
}
