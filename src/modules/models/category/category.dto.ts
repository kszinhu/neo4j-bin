import { z } from 'zod';

export { Category } from '@prisma/client';

export const categorySchema = z.object({
  id: z.string(),
  code: z.string().nullable(),
});
