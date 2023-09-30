import { Decimal } from '@prisma/client/runtime/library';
import { z } from 'zod';

export { Product } from '@prisma/client';

export const productSchema = z.object({
  id: z.number(),
  brand: z.string().nullable(),
  price: z.number().transform((value) => new Decimal(value)),
});
