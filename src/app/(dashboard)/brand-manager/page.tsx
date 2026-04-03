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
    <div className="space-y-6 lg:space-y-8">
      {/* Header — warm, human, no gradient banner */}
      <div className="animate-fade-in">
        <div className="flex items-end justify-between mb-1">
          <div>
            <h1 className="text-[22px] lg:text-[26px] font-bold tracking-tight text-foreground font-[var(--font-heading)]">
              {brand.brandName} <span className="text-muted-foreground font-normal text-[18px]">· Brand Manager</span>
            </h1>
            <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">
              Performance terrain — {format(new Date(), 'MMMM yyyy', { locale: fr })} · <span className="text-foreground/70 font-medium">12 magasins au Maroc</span>
            </p>
          </div>
        </div>
        <div className="h-[3px] w-16 rounded-full bg-[#f2994a] mt-3 opacity-60" />
      </div>

      {/* KPIs — staggered */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4">
        <KPIStatCard index={0} label="Audits réalisés" value={brand.totalAudits} change={12} changeLabel="vs mois" trend="up" icon={ClipboardCheck} iconColor="text-blue-600" />
        <KPIStatCard index={1} label="Conformité" value={`${brand.complianceRate}%`} change={3} trend="up" icon={ShieldCheck} iconColor="text-green-600" />
        <KPIStatCard index={2} label="Disponibilité" value={`${brand.availabilityRate}%`} change={2} trend="up" icon={TrendingUp} iconColor="text-emerald-600" />
        <KPIStatCard index={3} label="Taux de rupture" value={`${brand.ruptureRate}%`} change={-5} trend="down" icon={PackageX} iconColor="text-red-500" />
        <KPIStatCard index={4} label="Taux correction" value={`${brand.correctionRate}%`} change={8} trend="up" icon={CheckCircle2} iconColor="text-purple-500" />
        <KPIStatCard index={5} label="Fill Rate" value={`${brand.fillRate}%`} change={4} trend="up" icon={BarChart3} iconColor="text-cyan-600" />
      </div>

      {/* Weekly Execution Summary */}
      <div className="card-base p-5 animate-slide-up stagger-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f3f7]">
            <Activity className="h-3.5 w-3.5 text-primary" />
          </div>
          <h3 className="text-[14px] font-semibold text-foreground">Exécution terrain cette semaine</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-[#f0f3f7] p-3.5">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Audits réalisés</p>
            <p className="text-[22px] font-bold text-foreground mt-1">{weekly.totalAudits}</p>
          </div>
          <div className="rounded-lg bg-[#f0f3f7] p-3.5">
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
      <div className="card-base animate-slide-up stagger-2">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#f0f3f7]">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
            <Package className="h-3.5 w-3.5 text-red-500" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">Produits les plus touchés par les ruptures</h3>
            <p className="text-[11px] text-muted-foreground">Impact sur le réseau de distribution</p>
          </div>
        </div>
        <div className="divide-y divide-[#f0f3f7]">
          {mockTopRupturedProducts.map((product, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-[#fafbfd] transition-colors">
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
                <div className="w-20 h-2 bg-[#f0f3f7] rounded-full overflow-hidden">
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
            <TrendCard title="Audits réalisés — 7 jours" data={mockAuditTrend7d} color="#2d9cdb" />
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
        <div className="card-base card-accent-left" style={{ borderLeftColor: '#e74c3c' }}>
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#f0f3f7]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50/80">
              <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-foreground">Magasins à risque</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Suivi renforcé requis</p>
            </div>
          </div>
          <div className="divide-y divide-[#f0f3f7]">
            {riskyStores.map((store) => (
              <div key={store.storeId} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#fafbfd] transition-colors">
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

        <div className="card-base">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#f0f3f7]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50/80">
              <Trophy className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-foreground">Magasins performants</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Meilleure exécution</p>
            </div>
          </div>
          <div className="divide-y divide-[#f0f3f7]">
            {topStores.map((store, i) => (
              <div key={store.storeId} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#fafbfd] transition-colors">
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
      <div className="card-base">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#f0f3f7]">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f3f7]">
            <Target className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-foreground">Performance {brand.brandName} par magasin</h3>
            <p className="text-[11px] text-muted-foreground">Écarts de performance entre points de vente</p>
          </div>
        </div>
        <div className="divide-y divide-[#f0f3f7]">
          {mockBrandByStore.slice(0, 6).map((store) => (
            <div key={store.storeId} className="flex items-center justify-between px-5 py-3 hover:bg-[#fafbfd] transition-colors">
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
