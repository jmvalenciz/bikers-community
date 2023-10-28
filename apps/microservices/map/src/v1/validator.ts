import { ObjectIdSchema, Point } from '@bikers-community/models';
import { z } from 'zod';

export const getBikeLocationValidator = z.object({
  params: z.object({
    bikeId: ObjectIdSchema,
    bookingId: ObjectIdSchema,
  }),
});

export const setupBikeLocationValidator = z.object({
  params: z.object({
    bikeId: ObjectIdSchema,
    bookingId: ObjectIdSchema,
  }),
});

export const insertPointValidator = z.object({
  body: Point,
  params: z.object({
    bookingId: ObjectIdSchema,
    bikeId: ObjectIdSchema
  }),
});
