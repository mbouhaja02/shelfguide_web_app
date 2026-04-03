'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  filters: FilterConfig[];
  onFilterChange: (filters: Record<string, string>) => void;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function FilterBar({ filters, onFilterChange, searchPlaceholder, onSearch, className }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const updated = { ...activeFilters, [key]: value };
    if (value === '') delete updated[key];
    setActiveFilters(updated);
    onFilterChange(updated);
  };

  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const activeCount = Object.keys(activeFilters).length;

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
          <Input
            placeholder={searchPlaceholder || 'Rechercher...'}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 h-8 text-[13px] bg-white border-border/60 focus:ring-primary/20"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-[12px] font-medium border-border/60"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filtres
          {activeCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[9px] font-bold px-1">
              {activeCount}
            </span>
          )}
        </Button>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-[12px] text-muted-foreground hover:text-foreground" onClick={clearFilters}>
            <X className="h-3 w-3" />
            Réinitialiser
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-3 rounded-xl border border-border/60 bg-white p-4">
          {filters.map((filter) => (
            <div key={filter.key} className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                {filter.label}
              </label>
              <select
                value={activeFilters[filter.key] || ''}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="h-8 rounded-lg border border-border/60 bg-white px-2.5 text-[13px] min-w-[140px] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              >
                <option value="">Tous</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
