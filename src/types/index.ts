// ─── Roles ───────────────────────────────────────────────

export type UserRole = 'chef_rayon' | 'brand_manager';

// ─── User ────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  storeIds?: string[];       // chef de rayon
  brandId?: string;          // brand manager
  createdAt: string;
  lastLoginAt: string;
}

// ─── Store & Department ──────────────────────────────────

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  retailer: string;         // enseigne
  lat?: number;
  lng?: number;
}

export interface Department {
  id: string;
  name: string;
  storeId: string;
  categoryIds: string[];
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
}

// ─── Audit ───────────────────────────────────────────────

export type AuditStatus = 'pending' | 'in_progress' | 'completed' | 'validated' | 'rejected';
export type AuditPriority = 'low' | 'medium' | 'high' | 'critical';
export type AuditType = 'standard' | 'empty_shelves';
export type AnalysisType = 'local_simulation' | 'ai_api';

export interface EmptyShelfZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  label?: string;
}

export interface AuditMetrics {
  score: number;             // 0–100
  fillRate: number;          // 0–100
  emptyZonesCount: number;
  anomaliesCount: number;
  confidence: number;        // 0–1
  complianceRate?: number;   // 0–100
  availabilityRate?: number; // 0–100
}

export interface Audit {
  id: string;
  storeId: string;
  departmentId: string;
  categoryId: string;
  userId: string;
  type: AuditType;
  analysisType: AnalysisType;
  status: AuditStatus;
  priority: AuditPriority;
  imageUrl: string;
  annotatedImageUrl?: string;
  metrics: AuditMetrics;
  emptyZones: EmptyShelfZone[];
  comment?: string;
  validationComment?: string;
  validatedBy?: string;
  syncStatus: 'local' | 'synced' | 'error';
  createdAt: string;
  updatedAt: string;
}

// ─── Corrective Actions ──────────────────────────────────

export type CorrectiveActionStatus = 'todo' | 'in_progress' | 'corrected' | 'to_validate' | 'rejected';

export interface CorrectiveAction {
  id: string;
  auditId: string;
  storeId: string;
  departmentId: string;
  title: string;
  description: string;
  status: CorrectiveActionStatus;
  priority: AuditPriority;
  assigneeId: string;
  assigneeName: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// ─── Brand Performance ───────────────────────────────────

export interface BrandPerformance {
  brandId: string;
  brandName: string;
  period: string;
  totalAudits: number;
  complianceRate: number;
  availabilityRate: number;
  ruptureRate: number;
  correctionRate: number;
  estimatedFacings: number;
  fillRate: number;
}

export interface StorePerformance {
  storeId: string;
  storeName: string;
  retailer: string;
  region: string;
  globalScore: number;
  anomalies: number;
  ruptures: number;
  auditsCount: number;
  avgCorrectionDelay: number; // hours
  complianceRate: number;
  lastAuditDate: string;
}

// ─── Notifications ───────────────────────────────────────

export type NotificationType = 'alert' | 'info' | 'success' | 'warning';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

// ─── Trend Data ──────────────────────────────────────────

export interface TrendDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface KPIData {
  label: string;
  value: number | string;
  change?: number;           // percent change
  changeLabel?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: string;
}
