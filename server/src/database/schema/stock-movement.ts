import { z } from 'zod';
import { objectIdSchema } from './common';

const baseMovement = {
  productId: objectIdSchema,
  quantity: z.number().int('Jumlah harus bilangan bulat').positive('Jumlah harus lebih dari 0'),
  transactionDate: z.coerce.date().optional(), // default: sekarang (diatur di service)
  note: z.string().trim().max(500).optional(),
};

export const createStockInSchema = z.object({
  ...baseMovement,
  supplierId: objectIdSchema.optional(),
});

export const createStockOutSchema = z.object(baseMovement);

export const createAdjustmentSchema = z.object({
  ...baseMovement,
  direction: z.enum(['INCREASE', 'DECREASE']),
  note: z.string().trim().min(1, 'Alasan penyesuaian wajib diisi').max(500),
});

export const reverseMovementSchema = z.object({
  note: z.string().trim().min(1, 'Alasan koreksi wajib diisi').max(500),
});

export const movementQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  type: z.enum(['IN', 'OUT', 'ADJUSTMENT']).optional(),
  productId: objectIdSchema.optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type CreateStockInInput = z.infer<typeof createStockInSchema>;
export type CreateStockOutInput = z.infer<typeof createStockOutSchema>;
export type CreateAdjustmentInput = z.infer<typeof createAdjustmentSchema>;
export type MovementQuery = z.infer<typeof movementQuerySchema>;