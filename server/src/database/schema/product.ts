import { z } from 'zod';
import { objectIdSchema } from './common';

const eoqParamsSchema = z
  .object({
    orderingCost: z.number().positive('Biaya pemesanan harus lebih dari 0'),
    holdingCostType: z.enum(['nominal', 'percent']),
    holdingCostValue: z.number().positive('Biaya penyimpanan harus lebih dari 0'),
  })
  .superRefine((v, ctx) => {
    if (v.holdingCostType === 'percent' && v.holdingCostValue > 100) {
      ctx.addIssue({
        code: 'custom',
        path: ['holdingCostValue'],
        message: 'Persentase tidak boleh lebih dari 100',
      });
    }
  });

const productBase = z.object({
  code: z.string().trim().min(1, 'Kode barang wajib diisi').max(50).toUpperCase(),
  name: z.string().trim().min(1, 'Nama barang wajib diisi').max(200),
  categoryId: objectIdSchema,
  unit: z.string().trim().min(1, 'Satuan wajib diisi').max(20),
  minStock: z.number().int().min(0).default(0),
  unitPrice: z.number().min(0).optional(),
  eoqParams: eoqParamsSchema.optional(),
});

// Jika H berbasis persen, harga satuan wajib ada.
export const createProductSchema = productBase.superRefine((v, ctx) => {
  if (v.eoqParams?.holdingCostType === 'percent' && v.unitPrice === undefined) {
    ctx.addIssue({
      code: 'custom',
      path: ['unitPrice'],
      message: 'Harga satuan wajib diisi jika biaya penyimpanan berbasis persen',
    });
  }
});

// Stok tidak boleh diubah lewat update produk; hanya lewat transaksi stok.
export const updateProductSchema = productBase
  .partial()
  .extend({ isActive: z.boolean().optional() });

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  categoryId: objectIdSchema.optional(),
  lowStock: z.coerce.boolean().optional(),
  isActive: z.enum(['true', 'false']).optional(),
  sortBy: z.enum(['code', 'name', 'currentStock', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;