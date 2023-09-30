import { EventKind } from '@prisma/client';
import { z } from 'zod';

export { Event } from '@prisma/client';

export const eventSchema = z.object({
  id: z.number(),
  time: z.date(),
  kind: z.nativeEnum(EventKind),
  user_session: z.string(),
  product_id: z.number(),
  user_id: z.number(),
});
