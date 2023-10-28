import { NewBike, ObjectIdSchema, UpdateBike } from '@bikers-community/models';
import { z } from 'zod';

export const getBikeValidator = z.object({
  params: z.object({
    bikeId: ObjectIdSchema,
  }),
});

export const newBikeValidator = z.object({
  body: NewBike,
});

export const updateBikeValidator = z.object({
  body: UpdateBike,
  params: z.object({
    bikeId: ObjectIdSchema,
  }),
});

export const getBikeListValidator = z.object({
});
