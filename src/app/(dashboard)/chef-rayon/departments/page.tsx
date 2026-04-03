'use client';

import { mockDepartments, mockAudits, mockActions, mockStores } from '@/data/mock-data';
import { Store, AlertTriangle, CheckCircle2, Layers } from 'lucide-react';

export default function DepartmentsPage() {
  // Get departments from stores the user manages (s1 and s2)
  const userStoreIds = ['s1', 's2'];
  const departments = mockDepartments.filter(d => userStoreIds.includes(d.storeId));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Mes rayons</h1>
        <p className="text-[13px] text-muted-foreground">Suivez la conformité et l&apos;état de chaque rayon</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {departments.map((dept) => {
          const store = mockStores.find(s => s.id === dept.storeId);
          const deptAudits = mockAudits.filter(a => a.departmentId === dept.id);
          const deptActions = mockActions.filter(a => a.departmentId === dept.id);
          const openActions = deptActions.filter(a => a.status === 'todo' || a.status === 'in_progress');
          const anomalies = deptAudits.reduce((sum, a) => sum + a.metrics.anomaliesCount, 0);
          const avgScore = deptAudits.length > 0
            ? Math.round(deptAudits.reduce((sum, a) => sum + a.metrics.score, 0) / deptAudits.length)
            : 0;
          const avgFillRate = deptAudits.length > 0
            ? Math.round(deptAudits.reduce((sum, a) => sum + a.metrics.fillRate, 0) / deptAudits.length)
            : 0;

          const scoreColor = avgScore >= 80 ? 'text-green-600' : avgScore >= 60 ? 'text-amber-600' : 'text-red-600';
          const scoreStatus = avgScore >= 80 ? 'Bon' : avgScore >= 60 ? 'Moyen' : 'Critique';
          const statusDot = avgScore >= 80 ? 'bg-green-500' : avgScore >= 60 ? 'bg-amber-500' : 'bg-red-500';
          const statusBg = avgScore >= 80 ? 'bg-green-50 text-green-700' : avgScore >= 60 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700';

          return (
            <div key={dept.id} className="rounded-2xl border border-sky-100/60 bg-white hover:shadow-md hover:shadow-black/[0.04] transition-all p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                      <Layers className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold">{dept.name}</h3>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Store className="h-3 w-3" />
                        {store?.name}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusBg}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${statusDot}`} />
                    {scoreStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl bg-sky-50/50/80 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Score</p>
                    <p className={`text-xl font-bold tabular-nums ${scoreColor}`}>{avgScore || '—'}</p>
                  </div>
                  <div className="rounded-xl bg-sky-50/50/80 p-3">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Fill rate</p>
                    <p className="text-xl font-bold tabular-nums">{avgFillRate ? `${avgFillRate}%` : '—'}</p>
                  </div>
                  <div className="rounded-xl bg-sky-50/50/80 p-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Anomalies</p>
                      <p className="text-[14px] font-semibold tabular-nums">{anomalies}</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-sky-50/50/80 p-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Actions</p>
                      <p className="text-[14px] font-semibold tabular-nums">{openActions.length}</p>
                    </div>
                  </div>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
