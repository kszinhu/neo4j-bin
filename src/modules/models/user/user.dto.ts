import { z } from 'zod';

export { User } from '@prisma/client';

export const userSchema = z.object({
  id: z.number(),
});
