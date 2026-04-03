import { cn } from '@/lib/utils';
import { AuditStatus, AuditPriority, CorrectiveActionStatus } from '@/types';

const statusConfig: Record<AuditStatus, { label: string; dot: string; className: string }> = {
  pending: { label: 'En attente', dot: 'bg-amber-400', className: 'bg-amber-50 text-amber-700' },
  in_progress: { label: 'En cours', dot: 'bg-blue-400', className: 'bg-blue-50 text-blue-700' },
  completed: { label: 'Terminé', dot: 'bg-emerald-400', className: 'bg-emerald-50 text-emerald-700' },
  validated: { label: 'Validé', dot: 'bg-emerald-500', className: 'bg-emerald-50 text-emerald-700' },
  rejected: { label: 'Rejeté', dot: 'bg-red-400', className: 'bg-red-50 text-red-700' },
};

export function StatusBadge({ status }: { status: AuditStatus }) {
  const config = statusConfig[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold', config.className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}

const priorityConfig: Record<AuditPriority, { label: string; className: string }> = {
  low: { label: 'Basse', className: 'bg-slate-100 text-slate-600' },
  medium: { label: 'Moyenne', className: 'bg-amber-50 text-amber-700' },
  high: { label: 'Haute', className: 'bg-orange-50 text-orange-700' },
  critical: { label: 'Critique', className: 'bg-red-50 text-red-700 ring-1 ring-red-200' },
};

export function SeverityBadge({ priority }: { priority: AuditPriority }) {
  const config = priorityConfig[priority];
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold', config.className)}>
      {config.label}
    </span>
  );
}

const actionStatusConfig: Record<CorrectiveActionStatus, { label: string; dot: string; className: string }> = {
  todo: { label: 'À faire', dot: 'bg-slate-400', className: 'bg-slate-50 text-slate-700' },
  in_progress: { label: 'En cours', dot: 'bg-blue-400', className: 'bg-blue-50 text-blue-700' },
  corrected: { label: 'Corrigé', dot: 'bg-emerald-400', className: 'bg-emerald-50 text-emerald-700' },
  to_validate: { label: 'À valider', dot: 'bg-violet-400', className: 'bg-violet-50 text-violet-700' },
  rejected: { label: 'Rejeté', dot: 'bg-red-400', className: 'bg-red-50 text-red-700' },
};

export function ActionStatusBadge({ status }: { status: CorrectiveActionStatus }) {
  const config = actionStatusConfig[status];
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold', config.className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}
