'use client';

import { useState, useMemo } from 'react';
import { DashboardSection } from '@/components/dashboard/dashboard-section';
import { FilterBar } from '@/components/dashboard/filter-bar';
import { StorePerformanceTable } from '@/components/dashboard/store-performance-table';
import { mockStorePerformances } from '@/data/mock-data';

export default function BrandManagerStoresPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const regions = Array.from(new Set(mockStorePerformances.map(s => s.region)));
  const retailers = Array.from(new Set(mockStorePerformances.map(s => s.retailer)));

  const filterConfigs = [
    {
      key: 'region',
      label: 'Région',
      options: regions.map(r => ({ label: r, value: r })),
    },
    {
      key: 'retailer',
      label: 'Enseigne',
      options: retailers.map(r => ({ label: r, value: r })),
    },
  ];

  const filteredStores = useMemo(() => {
    let result = [...mockStorePerformances];
    if (filters.region) result = result.filter(s => s.region === filters.region);
    if (filters.retailer) result = result.filter(s => s.retailer === filters.retailer);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.storeName.toLowerCase().includes(q) ||
        s.retailer.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q)
      );
    }
    return result;
  }, [filters, searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Performance magasins</h1>
        <p className="text-[13px] text-muted-foreground">Comparaison détaillée de tous les points de vente</p>
      </div>

      <FilterBar
        filters={filterConfigs}
        onFilterChange={setFilters}
        onSearch={setSearchQuery}
        searchPlaceholder="Rechercher un magasin..."
      />

      <DashboardSection title={`${filteredStores.length} magasin${filteredStores.length > 1 ? 's' : ''}`}>
        <StorePerformanceTable stores={filteredStores} />
      </DashboardSection>
    </div>
  );
}
