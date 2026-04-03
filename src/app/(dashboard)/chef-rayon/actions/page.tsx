'use client';

import { useState, useMemo } from 'react';
import { DashboardSection } from '@/components/dashboard/dashboard-section';
import { FilterBar } from '@/components/dashboard/filter-bar';
import { ActionTable } from '@/components/dashboard/action-table';
import { PieChartCard } from '@/components/dashboard/charts';
import { mockActions, mockStores, mockActionStatusDistribution } from '@/data/mock-data';

export default function ChefRayonActionsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filterConfigs = [
    {
      key: 'status',
      label: 'Statut',
      options: [
        { label: 'À faire', value: 'todo' },
        { label: 'En cours', value: 'in_progress' },
        { label: 'Corrigé', value: 'corrected' },
        { label: 'À valider', value: 'to_validate' },
        { label: 'Rejeté', value: 'rejected' },
      ],
    },
    {
      key: 'priority',
      label: 'Priorité',
      options: [
        { label: 'Critique', value: 'critical' },
        { label: 'Haute', value: 'high' },
        { label: 'Moyenne', value: 'medium' },
        { label: 'Basse', value: 'low' },
      ],
    },
    {
      key: 'store',
      label: 'Magasin',
      options: mockStores.map(s => ({ label: s.name, value: s.id })),
    },
  ];

  const filteredActions = useMemo(() => {
    let result = [...mockActions];
    if (filters.status) result = result.filter(a => a.status === filters.status);
    if (filters.priority) result = result.filter(a => a.priority === filters.priority);
    if (filters.store) result = result.filter(a => a.storeId === filters.store);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.assigneeName.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return (priorityOrder[a.priority] - priorityOrder[b.priority]) ||
        (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    });
  }, [filters, searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Actions correctives</h1>
        <p className="text-[13px] text-muted-foreground">Suivi des actions de correction de vos rayons</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <FilterBar
            filters={filterConfigs}
            onFilterChange={setFilters}
            onSearch={setSearchQuery}
            searchPlaceholder="Rechercher une action..."
          />
        </div>
        <PieChartCard
          title="Répartition par statut"
          data={mockActionStatusDistribution}
        />
      </div>

      <DashboardSection
        title={`${filteredActions.length} action${filteredActions.length > 1 ? 's' : ''}`}
      >
        <ActionTable actions={filteredActions} basePath="/chef-rayon/actions" />
      </DashboardSection>
    </div>
  );
}
