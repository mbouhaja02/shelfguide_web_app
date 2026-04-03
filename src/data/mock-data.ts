import {
  User,
  Store,
  Department,
  Category,
  Audit,
  CorrectiveAction,
  StorePerformance,
  BrandPerformance,
  Notification,
  TrendDataPoint,
} from '@/types';

// ─── Users ───────────────────────────────────────────────

export const mockUsers: User[] = [
  {
    id: 'u1',
    email: 'fatima.benali@carrefour.ma',
    fullName: 'Fatima Benali',
    role: 'chef_rayon',
    storeIds: ['s1', 's2'],
    createdAt: '2025-06-01T08:00:00Z',
    lastLoginAt: '2026-04-03T07:30:00Z',
  },
  {
    id: 'u2',
    email: 'marc.dupont@danone.com',
    fullName: 'Marc Dupont',
    role: 'brand_manager',
    brandId: 'b1',
    createdAt: '2025-05-15T10:00:00Z',
    lastLoginAt: '2026-04-03T08:00:00Z',
  },
  {
    id: 'u3',
    email: 'karim.idrissi@marjane.ma',
    fullName: 'Karim Idrissi',
    role: 'chef_rayon',
    storeIds: ['s3'],
    createdAt: '2025-07-10T09:00:00Z',
    lastLoginAt: '2026-04-02T18:00:00Z',
  },
  {
    id: 'u4',
    email: 'sophie.martin@nestle.com',
    fullName: 'Sophie Martin',
    role: 'brand_manager',
    brandId: 'b2',
    createdAt: '2025-08-01T11:00:00Z',
    lastLoginAt: '2026-04-03T09:15:00Z',
  },
];

// ─── Stores ──────────────────────────────────────────────

export const mockStores: Store[] = [
  { id: 's1', name: 'Carrefour Maârif', address: '123 Bd Massira', city: 'Casablanca', region: 'Grand Casablanca', retailer: 'Carrefour' },
  { id: 's2', name: 'Carrefour Anfa', address: '45 Av des FAR', city: 'Casablanca', region: 'Grand Casablanca', retailer: 'Carrefour' },
  { id: 's3', name: 'Marjane Hay Riad', address: '78 Av Al Quods', city: 'Rabat', region: 'Rabat-Salé', retailer: 'Marjane' },
  { id: 's4', name: 'Marjane Agdal', address: '12 Av Ibn Sina', city: 'Rabat', region: 'Rabat-Salé', retailer: 'Marjane' },
  { id: 's5', name: 'Aswak Assalam Tanger', address: '90 Bd Mohamed V', city: 'Tanger', region: 'Tanger-Tétouan', retailer: 'Aswak Assalam' },
  { id: 's6', name: 'Carrefour Marrakech', address: '200 Av Mohammed VI', city: 'Marrakech', region: 'Marrakech-Safi', retailer: 'Carrefour' },
];

// ─── Categories ──────────────────────────────────────────

export const mockCategories: Category[] = [
  { id: 'c1', name: 'Produits laitiers' },
  { id: 'c2', name: 'Boissons' },
  { id: 'c3', name: 'Épicerie sucrée' },
  { id: 'c4', name: 'Épicerie salée' },
  { id: 'c5', name: 'Hygiène & Beauté' },
  { id: 'c6', name: 'Entretien ménager' },
  { id: 'c7', name: 'Surgelés' },
  { id: 'c8', name: 'Boulangerie & Pâtisserie' },
];

// ─── Departments ─────────────────────────────────────────

export const mockDepartments: Department[] = [
  { id: 'd1', name: 'Frais', storeId: 's1', categoryIds: ['c1', 'c7'] },
  { id: 'd2', name: 'Boissons & Épicerie', storeId: 's1', categoryIds: ['c2', 'c3', 'c4'] },
  { id: 'd3', name: 'DPH', storeId: 's1', categoryIds: ['c5', 'c6'] },
  { id: 'd4', name: 'Frais', storeId: 's2', categoryIds: ['c1', 'c7'] },
  { id: 'd5', name: 'Épicerie', storeId: 's2', categoryIds: ['c3', 'c4'] },
  { id: 'd6', name: 'Frais & Surgelés', storeId: 's3', categoryIds: ['c1', 'c7'] },
  { id: 'd7', name: 'Boissons', storeId: 's3', categoryIds: ['c2'] },
  { id: 'd8', name: 'Épicerie', storeId: 's4', categoryIds: ['c3', 'c4'] },
  { id: 'd9', name: 'DPH', storeId: 's5', categoryIds: ['c5', 'c6'] },
  { id: 'd10', name: 'Frais', storeId: 's6', categoryIds: ['c1'] },
];

// ─── Audits ──────────────────────────────────────────────

export const mockAudits: Audit[] = [
  {
    id: 'a1',
    storeId: 's1',
    departmentId: 'd1',
    categoryId: 'c1',
    userId: 'u1',
    type: 'empty_shelves',
    analysisType: 'ai_api',
    status: 'completed',
    priority: 'high',
    imageUrl: '/images/shelf-1.jpg',
    annotatedImageUrl: '/images/shelf-1-annotated.jpg',
    metrics: { score: 62, fillRate: 71, emptyZonesCount: 4, anomaliesCount: 3, confidence: 0.89, complianceRate: 68, availabilityRate: 72 },
    emptyZones: [
      { id: 'z1', x: 120, y: 80, width: 200, height: 150, confidence: 0.92, severity: 'high', label: 'Yaourt Danone Nature' },
      { id: 'z2', x: 350, y: 90, width: 180, height: 140, confidence: 0.87, severity: 'medium', label: 'Lait Centrale 1L' },
      { id: 'z3', x: 550, y: 200, width: 160, height: 120, confidence: 0.78, severity: 'low', label: 'Fromage Kiri' },
      { id: 'z4', x: 100, y: 300, width: 220, height: 160, confidence: 0.94, severity: 'high', label: 'Activia Vanille' },
    ],
    comment: 'Rupture importante sur zone Danone. Réserve vérifiée : stock insuffisant.',
    syncStatus: 'synced',
    createdAt: '2026-04-03T08:15:00Z',
    updatedAt: '2026-04-03T08:45:00Z',
  },
  {
    id: 'a2',
    storeId: 's1',
    departmentId: 'd2',
    categoryId: 'c2',
    userId: 'u1',
    type: 'standard',
    analysisType: 'local_simulation',
    status: 'validated',
    priority: 'medium',
    imageUrl: '/images/shelf-2.jpg',
    metrics: { score: 85, fillRate: 88, emptyZonesCount: 1, anomaliesCount: 1, confidence: 0.75, complianceRate: 82, availabilityRate: 90 },
    emptyZones: [
      { id: 'z5', x: 400, y: 150, width: 130, height: 100, confidence: 0.72, severity: 'low', label: 'Coca-Cola 1.5L' },
    ],
    comment: 'Rayon boissons globalement bien tenu. Léger manque en Coca-Cola.',
    validatedBy: 'u1',
    validationComment: 'Conforme après réassort.',
    syncStatus: 'synced',
    createdAt: '2026-04-02T14:20:00Z',
    updatedAt: '2026-04-02T15:00:00Z',
  },
  {
    id: 'a3',
    storeId: 's2',
    departmentId: 'd4',
    categoryId: 'c1',
    userId: 'u1',
    type: 'empty_shelves',
    analysisType: 'ai_api',
    status: 'pending',
    priority: 'critical',
    imageUrl: '/images/shelf-3.jpg',
    annotatedImageUrl: '/images/shelf-3-annotated.jpg',
    metrics: { score: 38, fillRate: 42, emptyZonesCount: 7, anomaliesCount: 6, confidence: 0.93, complianceRate: 35, availabilityRate: 45 },
    emptyZones: [
      { id: 'z6', x: 50, y: 60, width: 250, height: 180, confidence: 0.96, severity: 'high', label: 'Rayon yaourts complet' },
      { id: 'z7', x: 320, y: 70, width: 200, height: 150, confidence: 0.91, severity: 'high', label: 'Danone Fruits' },
      { id: 'z8', x: 540, y: 100, width: 170, height: 130, confidence: 0.88, severity: 'medium', label: 'Jockey Fraise' },
      { id: 'z9', x: 80, y: 270, width: 300, height: 200, confidence: 0.95, severity: 'high', label: 'Zone basse complète' },
      { id: 'z10', x: 400, y: 280, width: 150, height: 120, confidence: 0.82, severity: 'medium', label: 'Nestlé P\'tit Yaoûrt' },
      { id: 'z11', x: 570, y: 300, width: 140, height: 110, confidence: 0.79, severity: 'low', label: 'Kiri barquette' },
      { id: 'z12', x: 200, y: 420, width: 280, height: 100, confidence: 0.90, severity: 'high', label: 'Étagère basse vide' },
    ],
    comment: 'Situation critique. Plus de 50% du rayon vide. Urgent.',
    syncStatus: 'synced',
    createdAt: '2026-04-03T07:00:00Z',
    updatedAt: '2026-04-03T07:30:00Z',
  },
  {
    id: 'a4',
    storeId: 's3',
    departmentId: 'd6',
    categoryId: 'c1',
    userId: 'u3',
    type: 'empty_shelves',
    analysisType: 'ai_api',
    status: 'completed',
    priority: 'medium',
    imageUrl: '/images/shelf-4.jpg',
    metrics: { score: 74, fillRate: 79, emptyZonesCount: 2, anomaliesCount: 2, confidence: 0.85, complianceRate: 76, availabilityRate: 80 },
    emptyZones: [
      { id: 'z13', x: 150, y: 100, width: 190, height: 140, confidence: 0.84, severity: 'medium', label: 'Lait Jaouda' },
      { id: 'z14', x: 500, y: 250, width: 160, height: 130, confidence: 0.81, severity: 'low', label: 'Beurre Président' },
    ],
    syncStatus: 'synced',
    createdAt: '2026-04-02T10:00:00Z',
    updatedAt: '2026-04-02T10:30:00Z',
  },
  {
    id: 'a5',
    storeId: 's3',
    departmentId: 'd7',
    categoryId: 'c2',
    userId: 'u3',
    type: 'standard',
    analysisType: 'local_simulation',
    status: 'validated',
    priority: 'low',
    imageUrl: '/images/shelf-5.jpg',
    metrics: { score: 92, fillRate: 95, emptyZonesCount: 0, anomaliesCount: 0, confidence: 0.70, complianceRate: 94, availabilityRate: 96 },
    emptyZones: [],
    comment: 'Rayon boissons parfaitement tenu.',
    validatedBy: 'u3',
    validationComment: 'Excellent. Rien à signaler.',
    syncStatus: 'synced',
    createdAt: '2026-04-01T16:00:00Z',
    updatedAt: '2026-04-01T16:20:00Z',
  },
  {
    id: 'a6',
    storeId: 's4',
    departmentId: 'd8',
    categoryId: 'c3',
    userId: 'u3',
    type: 'empty_shelves',
    analysisType: 'ai_api',
    status: 'in_progress',
    priority: 'high',
    imageUrl: '/images/shelf-6.jpg',
    annotatedImageUrl: '/images/shelf-6-annotated.jpg',
    metrics: { score: 55, fillRate: 60, emptyZonesCount: 5, anomaliesCount: 4, confidence: 0.88, complianceRate: 52, availabilityRate: 58 },
    emptyZones: [
      { id: 'z15', x: 80, y: 90, width: 210, height: 160, confidence: 0.90, severity: 'high', label: 'Biscuits LU' },
      { id: 'z16', x: 310, y: 100, width: 180, height: 140, confidence: 0.86, severity: 'medium', label: 'Nutella 400g' },
      { id: 'z17', x: 510, y: 200, width: 150, height: 120, confidence: 0.83, severity: 'medium', label: 'Céréales Chocapic' },
      { id: 'z18', x: 100, y: 350, width: 240, height: 170, confidence: 0.92, severity: 'high', label: 'Zone promotion vide' },
      { id: 'z19', x: 400, y: 370, width: 170, height: 130, confidence: 0.80, severity: 'low', label: 'Confiture Bonne Maman' },
    ],
    comment: 'Problème d\'approvisionnement sur zone promotion.',
    syncStatus: 'synced',
    createdAt: '2026-04-03T09:00:00Z',
    updatedAt: '2026-04-03T09:30:00Z',
  },
  {
    id: 'a7',
    storeId: 's5',
    departmentId: 'd9',
    categoryId: 'c5',
    userId: 'u1',
    type: 'standard',
    analysisType: 'local_simulation',
    status: 'completed',
    priority: 'low',
    imageUrl: '/images/shelf-7.jpg',
    metrics: { score: 88, fillRate: 91, emptyZonesCount: 1, anomaliesCount: 1, confidence: 0.72, complianceRate: 86, availabilityRate: 89 },
    emptyZones: [
      { id: 'z20', x: 300, y: 180, width: 140, height: 100, confidence: 0.71, severity: 'low', label: 'Shampoing Head & Shoulders' },
    ],
    syncStatus: 'synced',
    createdAt: '2026-04-01T11:00:00Z',
    updatedAt: '2026-04-01T11:20:00Z',
  },
  {
    id: 'a8',
    storeId: 's6',
    departmentId: 'd10',
    categoryId: 'c1',
    userId: 'u1',
    type: 'empty_shelves',
    analysisType: 'ai_api',
    status: 'rejected',
    priority: 'medium',
    imageUrl: '/images/shelf-8.jpg',
    annotatedImageUrl: '/images/shelf-8-annotated.jpg',
    metrics: { score: 70, fillRate: 75, emptyZonesCount: 3, anomaliesCount: 2, confidence: 0.82, complianceRate: 72, availabilityRate: 76 },
    emptyZones: [
      { id: 'z21', x: 200, y: 120, width: 170, height: 130, confidence: 0.80, severity: 'medium', label: 'Yaourt Soummam' },
      { id: 'z22', x: 450, y: 130, width: 160, height: 120, confidence: 0.78, severity: 'low', label: 'Fromage blanc' },
      { id: 'z23', x: 150, y: 300, width: 200, height: 150, confidence: 0.84, severity: 'medium', label: 'Zone promo yaourts' },
    ],
    comment: 'Photo floue, analyse peu fiable.',
    validationComment: 'Rejeté : qualité d\'image insuffisante. Refaire l\'audit.',
    syncStatus: 'synced',
    createdAt: '2026-03-31T14:00:00Z',
    updatedAt: '2026-04-01T09:00:00Z',
  },
  {
    id: 'a9',
    storeId: 's1',
    departmentId: 'd3',
    categoryId: 'c6',
    userId: 'u1',
    type: 'standard',
    analysisType: 'local_simulation',
    status: 'completed',
    priority: 'low',
    imageUrl: '/images/shelf-9.jpg',
    metrics: { score: 91, fillRate: 93, emptyZonesCount: 0, anomaliesCount: 0, confidence: 0.68, complianceRate: 90, availabilityRate: 94 },
    emptyZones: [],
    comment: 'Rayon entretien bien organisé.',
    syncStatus: 'synced',
    createdAt: '2026-04-02T09:00:00Z',
    updatedAt: '2026-04-02T09:15:00Z',
  },
  {
    id: 'a10',
    storeId: 's2',
    departmentId: 'd5',
    categoryId: 'c4',
    userId: 'u1',
    type: 'empty_shelves',
    analysisType: 'ai_api',
    status: 'completed',
    priority: 'medium',
    imageUrl: '/images/shelf-10.jpg',
    annotatedImageUrl: '/images/shelf-10-annotated.jpg',
    metrics: { score: 72, fillRate: 76, emptyZonesCount: 3, anomaliesCount: 2, confidence: 0.86, complianceRate: 70, availabilityRate: 78 },
    emptyZones: [
      { id: 'z24', x: 100, y: 100, width: 180, height: 140, confidence: 0.85, severity: 'medium', label: 'Pâtes Panzani' },
      { id: 'z25', x: 350, y: 200, width: 160, height: 120, confidence: 0.82, severity: 'low', label: 'Huile Lesieur' },
      { id: 'z26', x: 550, y: 120, width: 140, height: 110, confidence: 0.88, severity: 'medium', label: 'Sauce tomate Heinz' },
    ],
    syncStatus: 'synced',
    createdAt: '2026-04-02T16:30:00Z',
    updatedAt: '2026-04-02T17:00:00Z',
  },
];

// ─── Corrective Actions ──────────────────────────────────

export const mockActions: CorrectiveAction[] = [
  {
    id: 'ca1',
    auditId: 'a1',
    storeId: 's1',
    departmentId: 'd1',
    title: 'Réassort yaourt Danone Nature',
    description: 'Réapprovisionner la zone yaourts Danone. Vérifier la réserve et passer commande si nécessaire.',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'u1',
    assigneeName: 'Fatima Benali',
    dueDate: '2026-04-03T18:00:00Z',
    createdAt: '2026-04-03T09:00:00Z',
    updatedAt: '2026-04-03T10:00:00Z',
  },
  {
    id: 'ca2',
    auditId: 'a1',
    storeId: 's1',
    departmentId: 'd1',
    title: 'Réassort Activia Vanille',
    description: 'Zone basse vide. Contacter le fournisseur pour livraison express.',
    status: 'todo',
    priority: 'high',
    assigneeId: 'u1',
    assigneeName: 'Fatima Benali',
    dueDate: '2026-04-04T12:00:00Z',
    createdAt: '2026-04-03T09:10:00Z',
    updatedAt: '2026-04-03T09:10:00Z',
  },
  {
    id: 'ca3',
    auditId: 'a3',
    storeId: 's2',
    departmentId: 'd4',
    title: 'Urgence rayon frais Carrefour Anfa',
    description: 'Plus de 50% du rayon vide. Mobiliser équipe pour réassort complet. Escalade au responsable de zone.',
    status: 'todo',
    priority: 'critical',
    assigneeId: 'u1',
    assigneeName: 'Fatima Benali',
    dueDate: '2026-04-03T14:00:00Z',
    createdAt: '2026-04-03T07:45:00Z',
    updatedAt: '2026-04-03T07:45:00Z',
  },
  {
    id: 'ca4',
    auditId: 'a4',
    storeId: 's3',
    departmentId: 'd6',
    title: 'Réassort lait Jaouda',
    description: 'Stock bas sur le lait Jaouda. Commander 2 palettes supplémentaires.',
    status: 'corrected',
    priority: 'medium',
    assigneeId: 'u3',
    assigneeName: 'Karim Idrissi',
    dueDate: '2026-04-03T16:00:00Z',
    createdAt: '2026-04-02T11:00:00Z',
    updatedAt: '2026-04-02T15:30:00Z',
    completedAt: '2026-04-02T15:30:00Z',
  },
  {
    id: 'ca5',
    auditId: 'a6',
    storeId: 's4',
    departmentId: 'd8',
    title: 'Remplir zone promotion épicerie',
    description: 'La tête de gondole promotion est vide. Mettre en place les produits promo de la semaine.',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'u3',
    assigneeName: 'Karim Idrissi',
    dueDate: '2026-04-03T17:00:00Z',
    createdAt: '2026-04-03T09:30:00Z',
    updatedAt: '2026-04-03T10:15:00Z',
  },
  {
    id: 'ca6',
    auditId: 'a6',
    storeId: 's4',
    departmentId: 'd8',
    title: 'Commander Nutella 400g',
    description: 'Rupture Nutella constatée. Passer commande urgente au fournisseur.',
    status: 'to_validate',
    priority: 'medium',
    assigneeId: 'u3',
    assigneeName: 'Karim Idrissi',
    dueDate: '2026-04-04T10:00:00Z',
    createdAt: '2026-04-03T09:35:00Z',
    updatedAt: '2026-04-03T11:00:00Z',
  },
  {
    id: 'ca7',
    auditId: 'a10',
    storeId: 's2',
    departmentId: 'd5',
    title: 'Réassort pâtes et sauces',
    description: 'Réapprovisionner les pâtes Panzani et sauce tomate Heinz. Vérifier DLC.',
    status: 'corrected',
    priority: 'medium',
    assigneeId: 'u1',
    assigneeName: 'Fatima Benali',
    dueDate: '2026-04-03T12:00:00Z',
    createdAt: '2026-04-02T17:15:00Z',
    updatedAt: '2026-04-03T08:00:00Z',
    completedAt: '2026-04-03T08:00:00Z',
  },
  {
    id: 'ca8',
    auditId: 'a8',
    storeId: 's6',
    departmentId: 'd10',
    title: 'Refaire audit rayon frais Marrakech',
    description: 'L\'audit précédent a été rejeté pour qualité d\'image insuffisante. Reprendre en condition lumière correcte.',
    status: 'rejected',
    priority: 'medium',
    assigneeId: 'u1',
    assigneeName: 'Fatima Benali',
    dueDate: '2026-04-02T18:00:00Z',
    createdAt: '2026-04-01T09:30:00Z',
    updatedAt: '2026-04-01T14:00:00Z',
  },
];

// ─── Store Performance ───────────────────────────────────

export const mockStorePerformances: StorePerformance[] = [
  { storeId: 's1', storeName: 'Carrefour Maârif', retailer: 'Carrefour', region: 'Grand Casablanca', globalScore: 78, anomalies: 4, ruptures: 2, auditsCount: 12, avgCorrectionDelay: 4.5, complianceRate: 76, lastAuditDate: '2026-04-03T08:45:00Z' },
  { storeId: 's2', storeName: 'Carrefour Anfa', retailer: 'Carrefour', region: 'Grand Casablanca', globalScore: 52, anomalies: 8, ruptures: 5, auditsCount: 8, avgCorrectionDelay: 8.2, complianceRate: 48, lastAuditDate: '2026-04-03T07:30:00Z' },
  { storeId: 's3', storeName: 'Marjane Hay Riad', retailer: 'Marjane', region: 'Rabat-Salé', globalScore: 83, anomalies: 2, ruptures: 1, auditsCount: 15, avgCorrectionDelay: 3.1, complianceRate: 82, lastAuditDate: '2026-04-02T10:30:00Z' },
  { storeId: 's4', storeName: 'Marjane Agdal', retailer: 'Marjane', region: 'Rabat-Salé', globalScore: 61, anomalies: 5, ruptures: 3, auditsCount: 10, avgCorrectionDelay: 6.7, complianceRate: 58, lastAuditDate: '2026-04-03T09:30:00Z' },
  { storeId: 's5', storeName: 'Aswak Assalam Tanger', retailer: 'Aswak Assalam', region: 'Tanger-Tétouan', globalScore: 87, anomalies: 1, ruptures: 0, auditsCount: 7, avgCorrectionDelay: 2.5, complianceRate: 88, lastAuditDate: '2026-04-01T11:20:00Z' },
  { storeId: 's6', storeName: 'Carrefour Marrakech', retailer: 'Carrefour', region: 'Marrakech-Safi', globalScore: 69, anomalies: 3, ruptures: 2, auditsCount: 6, avgCorrectionDelay: 5.8, complianceRate: 66, lastAuditDate: '2026-03-31T14:00:00Z' },
];

// ─── Brand Performance ───────────────────────────────────

export const mockBrandPerformances: BrandPerformance[] = [
  { brandId: 'b1', brandName: 'Danone', period: '2026-04', totalAudits: 28, complianceRate: 72, availabilityRate: 74, ruptureRate: 18, correctionRate: 65, estimatedFacings: 340, fillRate: 76 },
  { brandId: 'b2', brandName: 'Nestlé', period: '2026-04', totalAudits: 22, complianceRate: 78, availabilityRate: 80, ruptureRate: 12, correctionRate: 72, estimatedFacings: 280, fillRate: 82 },
];

// ─── Notifications ───────────────────────────────────────

export const mockNotifications: Notification[] = [
  { id: 'n1', userId: 'u1', type: 'alert', title: 'Audit critique', message: 'Carrefour Anfa — Rayon frais : 7 zones vides détectées. Score 38/100.', read: false, actionUrl: '/chef-rayon/audits/a3', createdAt: '2026-04-03T07:35:00Z' },
  { id: 'n2', userId: 'u1', type: 'warning', title: 'Action en retard', message: 'L\'action « Urgence rayon frais Carrefour Anfa » est due dans 3h.', read: false, actionUrl: '/chef-rayon/actions/ca3', createdAt: '2026-04-03T11:00:00Z' },
  { id: 'n3', userId: 'u1', type: 'success', title: 'Correction validée', message: 'Réassort pâtes et sauces — Carrefour Anfa a été corrigé avec succès.', read: true, actionUrl: '/chef-rayon/actions/ca7', createdAt: '2026-04-03T08:05:00Z' },
  { id: 'n4', userId: 'u2', type: 'info', title: 'Nouveau rapport disponible', message: 'Le rapport hebdomadaire Danone est disponible. 28 audits analysés.', read: false, actionUrl: '/brand-manager/insights', createdAt: '2026-04-03T06:00:00Z' },
  { id: 'n5', userId: 'u2', type: 'alert', title: 'Rupture détectée', message: 'Rupture Activia Vanille détectée dans 3 magasins sur 6.', read: false, actionUrl: '/brand-manager/performance', createdAt: '2026-04-03T09:00:00Z' },
  { id: 'n6', userId: 'u1', type: 'info', title: 'Audit terminé', message: 'Audit rayon entretien — Carrefour Maârif terminé. Score : 91/100.', read: true, actionUrl: '/chef-rayon/audits/a9', createdAt: '2026-04-02T09:20:00Z' },
];

// ─── Trend Data ──────────────────────────────────────────

export const mockAuditTrend7d: TrendDataPoint[] = [
  { date: '2026-03-28', value: 8 },
  { date: '2026-03-29', value: 5 },
  { date: '2026-03-30', value: 3 },
  { date: '2026-03-31', value: 7 },
  { date: '2026-04-01', value: 10 },
  { date: '2026-04-02', value: 12 },
  { date: '2026-04-03', value: 6 },
];

export const mockComplianceTrend30d: TrendDataPoint[] = [
  { date: '2026-03-05', value: 68 },
  { date: '2026-03-08', value: 70 },
  { date: '2026-03-11', value: 72 },
  { date: '2026-03-14', value: 69 },
  { date: '2026-03-17', value: 74 },
  { date: '2026-03-20', value: 71 },
  { date: '2026-03-23', value: 76 },
  { date: '2026-03-26', value: 73 },
  { date: '2026-03-29', value: 78 },
  { date: '2026-04-01', value: 75 },
  { date: '2026-04-03', value: 72 },
];

export const mockAnomaliesByCategory: { category: string; count: number }[] = [
  { category: 'Produits laitiers', count: 14 },
  { category: 'Épicerie sucrée', count: 8 },
  { category: 'Boissons', count: 5 },
  { category: 'Épicerie salée', count: 4 },
  { category: 'Hygiène & Beauté', count: 2 },
  { category: 'Entretien ménager', count: 1 },
];

export const mockActionStatusDistribution: { status: string; count: number; color: string }[] = [
  { status: 'À faire', count: 3, color: '#6366f1' },
  { status: 'En cours', count: 2, color: '#f59e0b' },
  { status: 'Corrigé', count: 2, color: '#22c55e' },
  { status: 'À valider', count: 1, color: '#3b82f6' },
  { status: 'Rejeté', count: 1, color: '#ef4444' },
];

// ─── Helper functions ────────────────────────────────────

export function getStore(id: string): Store | undefined {
  return mockStores.find(s => s.id === id);
}

export function getDepartment(id: string): Department | undefined {
  return mockDepartments.find(d => d.id === id);
}

export function getCategory(id: string): Category | undefined {
  return mockCategories.find(c => c.id === id);
}

export function getUser(id: string): User | undefined {
  return mockUsers.find(u => u.id === id);
}

export function getAuditsForStore(storeId: string): Audit[] {
  return mockAudits.filter(a => a.storeId === storeId);
}

export function getActionsForAudit(auditId: string): CorrectiveAction[] {
  return mockActions.filter(a => a.auditId === auditId);
}
