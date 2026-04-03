'use client';

import { KPIStatCard } from '@/components/dashboard/kpi-stat-card';
import { DashboardSection } from '@/components/dashboard/dashboard-section';
import { TrendCard } from '@/components/dashboard/trend-card';
import { BarChartCard } from '@/components/dashboard/charts';
import { mockBrandPerformances, mockComplianceTrend30d, mockAnomaliesByCategory } from '@/data/mock-data';
import {
  Package,
  Eye,
  BarChart3,
  ShieldCheck,
  PackageX,
} from 'lucide-react';

export default function BrandPerformancePage() {
  const brand = mockBrandPerformances[0];

  const categoryPerformance = [
    { category: 'Produits laitiers', fillRate: 76, compliance: 72, ruptures: 8, facings: 180 },
    { category: 'Boissons', fillRate: 88, compliance: 85, ruptures: 2, facings: 90 },
    { category: 'Épicerie sucrée', fillRate: 60, compliance: 55, ruptures: 6, facings: 70 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Performance marque — {brand.brandName}</h1>
        <p className="text-[13px] text-muted-foreground">Présence, disponibilité et exécution de votre marque</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPIStatCard
          label="Facings estimés"
          value={brand.estimatedFacings}
          change={5}
          trend="up"
          icon={Eye}
          iconColor="text-blue-600"
        />
        <KPIStatCard
          label="Fill Rate"
          value={`${brand.fillRate}%`}
          change={4}
          trend="up"
          icon={BarChart3}
          iconColor="text-sky-600"
        />
        <KPIStatCard
          label="Conformité planogramme"
          value={`${brand.complianceRate}%`}
          change={3}
          trend="up"
          icon={ShieldCheck}
          iconColor="text-green-600"
        />
        <KPIStatCard
          label="Ruptures / Low stock"
          value={`${brand.ruptureRate}%`}
          change={-5}
          trend="down"
          icon={PackageX}
          iconColor="text-red-500"
        />
      </div>

      {/* Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TrendCard
          title="Évolution du taux de conformité"
          data={mockComplianceTrend30d}
          color="#22c55e"
          unit="%"
        />
        <BarChartCard
          title="Anomalies par catégorie"
          data={mockAnomaliesByCategory}
          color="#ef4444"
        />
      </div>

      {/* Category Comparison */}
      <DashboardSection
        title="Performance par catégorie"
        description="Comparaison détaillée entre catégories de produits"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categoryPerformance.map((cat) => (
            <div key={cat.category} className="rounded-2xl border border-sky-100/60 bg-white overflow-hidden hover:shadow-md hover:shadow-black/[0.04] transition-all">
              <div className="flex items-center gap-2 border-b border-sky-50 px-5 py-3.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-50">
                  <Package className="h-3.5 w-3.5 text-sky-600" />
                </div>
                <h3 className="text-[13px] font-semibold">{cat.category}</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-sky-50/50/80 p-2.5 text-center">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Fill Rate</p>
                    <p className={`text-lg font-bold tabular-nums ${cat.fillRate >= 80 ? 'text-green-600' : cat.fillRate >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{cat.fillRate}%</p>
                  </div>
                  <div className="rounded-xl bg-sky-50/50/80 p-2.5 text-center">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Conformité</p>
                    <p className={`text-lg font-bold tabular-nums ${cat.compliance >= 80 ? 'text-green-600' : cat.compliance >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{cat.compliance}%</p>
                  </div>
                  <div className="rounded-xl bg-sky-50/50/80 p-2.5 text-center">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Ruptures</p>
                    <p className="text-lg font-bold tabular-nums">{cat.ruptures}</p>
                  </div>
                  <div className="rounded-xl bg-sky-50/50/80 p-2.5 text-center">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Facings</p>
                    <p className="text-lg font-bold tabular-nums">{cat.facings}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
