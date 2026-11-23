import { z } from 'zod';
import { objectIdSchema } from './common';

const manualDemand = z.object({
  source: z.literal('manual'),
  annualDemand: z.number().positive('Permintaan tahunan harus lebih dari 0'),
});

const fromMovements = z.object({
  source: z.literal('stock_movements'),
  periodStart: z.coerce.date(),
  periodEnd: z.coerce.date(),
});

export const calculateEoqSchema = z
  .object({
    productId: objectIdSchema,
    demand: z.discriminatedUnion('source', [fromMovements, manualDemand]),
    // Jika kosong, dipakai eoqParams milik barang. Jika keduanya kosong, ditolak.
    orderingCost: z.number().positive().optional(),
    holdingCostType: z.enum(['nominal', 'percent']).optional(),
    holdingCostValue: z.number().positive().optional(),
    daysPerYear: z.number().int().min(1).max(366).default(365),
  })
  .superRefine((v, ctx) => {
    if (v.demand.source === 'stock_movements' && v.demand.periodEnd <= v.demand.periodStart) {
      ctx.addIssue({
        code: 'custom',
        path: ['demand', 'periodEnd'],
        message: 'Akhir periode harus setelah awal periode',
      });
    }
  });

export const eoqQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  productId: objectIdSchema.optional(),
});

export type CalculateEoqInput = z.infer<typeof calculateEoqSchema>;