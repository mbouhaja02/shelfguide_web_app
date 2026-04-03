'use client';

import { useState, useMemo } from 'react';
import { DashboardSection } from '@/components/dashboard/dashboard-section';
import { FilterBar } from '@/components/dashboard/filter-bar';
import { AuditTable } from '@/components/dashboard/audit-table';
import { mockAudits, mockStores, mockDepartments, mockCategories } from '@/data/mock-data';

export default function ChefRayonAuditsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filterConfigs = [
    {
      key: 'status',
      label: 'Statut',
      options: [
        { label: 'En attente', value: 'pending' },
        { label: 'En cours', value: 'in_progress' },
        { label: 'Terminé', value: 'completed' },
        { label: 'Validé', value: 'validated' },
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
    {
      key: 'type',
      label: 'Type',
      options: [
        { label: 'Empty Shelves', value: 'empty_shelves' },
        { label: 'Standard', value: 'standard' },
      ],
    },
    {
      key: 'category',
      label: 'Catégorie',
      options: mockCategories.map(c => ({ label: c.name, value: c.id })),
    },
  ];

  const filteredAudits = useMemo(() => {
    let result = [...mockAudits];
    if (filters.status) result = result.filter(a => a.status === filters.status);
    if (filters.priority) result = result.filter(a => a.priority === filters.priority);
    if (filters.store) result = result.filter(a => a.storeId === filters.store);
    if (filters.type) result = result.filter(a => a.type === filters.type);
    if (filters.category) result = result.filter(a => a.categoryId === filters.category);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => {
        const store = mockStores.find(s => s.id === a.storeId);
        const dept = mockDepartments.find(d => d.id === a.departmentId);
        return (
          a.id.toLowerCase().includes(q) ||
          store?.name.toLowerCase().includes(q) ||
          dept?.name.toLowerCase().includes(q) ||
          a.comment?.toLowerCase().includes(q)
        );
      });
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [filters, searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Audits</h1>
        <p className="text-[13px] text-muted-foreground">Tous les audits de vos rayons</p>
      </div>

      <FilterBar
        filters={filterConfigs}
        onFilterChange={setFilters}
        onSearch={setSearchQuery}
        searchPlaceholder="Rechercher un audit, magasin..."
      />

      <DashboardSection
        title={`${filteredAudits.length} audit${filteredAudits.length > 1 ? 's' : ''}`}
      >
        <AuditTable audits={filteredAudits} basePath="/chef-rayon/audits" />
      </DashboardSection>
    </div>
  );
}
