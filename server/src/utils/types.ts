import type { ObjectId } from 'mongodb';

export type HoldingCostType = 'nominal' | 'percent';
export type MovementType = 'IN' | 'OUT' | 'ADJUSTMENT';
export type AdjustmentDirection = 'INCREASE' | 'DECREASE';
export type DemandSource = 'stock_movements' | 'manual';

export interface Category {
  _id: ObjectId;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  _id: ObjectId;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EoqParams {
  orderingCost: number;
  holdingCostType: HoldingCostType;
  holdingCostValue: number;
}

export interface Product {
  _id: ObjectId;
  code: string;
  name: string;
  categoryId: ObjectId;
  unit: string;
  currentStock: number;
  minStock: number;
  unitPrice?: number;
  eoqParams?: EoqParams;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockMovement {
  _id: ObjectId;
  transactionNumber: string;
  type: MovementType;
  adjustmentDirection?: AdjustmentDirection; // hanya untuk ADJUSTMENT
  productId: ObjectId;
  quantity: number; // selalu > 0
  stockBefore: number;
  stockAfter: number;
  transactionDate: Date;
  note?: string;
  supplierId?: ObjectId;
  reversalOf?: ObjectId;
  createdBy: string; // id user Better Auth
  createdAt: Date;
}

export interface EoqCalculation {
  _id: ObjectId;
  productId: ObjectId;

  // snapshot input
  productCode: string;
  productName: string;
  unit: string;
  period: { start: Date; end: Date };
  demandSource: DemandSource;
  periodDemand: number;
  annualDemand: number; // D
  daysInPeriod: number;
  orderingCost: number; // S
  holdingCostType: HoldingCostType;
  holdingCostInput: number;
  holdingCost: number; // H (nominal per unit per tahun)
  unitPrice?: number;
  daysPerYear: number;

  // hasil
  eoq: number; // Q*
  ordersPerYear: number;
  orderIntervalDays: number;
  annualOrderingCost: number;
  annualHoldingCost: number;
  totalCost: number;

  formulaVersion: string;
  calculatedBy: string;
  calculatedAt: Date;
}

export interface Counter {
  _id: string;
  seq: number;
}