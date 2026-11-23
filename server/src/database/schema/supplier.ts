import { z } from 'zod';

export const createSupplierSchema = z.object({
  name: z.string().trim().min(1, 'Nama pemasok wajib diisi').max(150),
  phone: z.string().trim().max(30).optional(),
  email: z.string().trim().email('Format email tidak valid').optional(),
  address: z.string().trim().max(300).optional(),
});

export const updateSupplierSchema = createSupplierSchema
  .partial()
  .extend({ isActive: z.boolean().optional() });

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>;