import { BIKE_STATUS, NewBike, ObjectIdSchema, UpdateBike } from '@bikers-community/models';
import { z } from 'zod';

export const getBikeValidator = z.object({
  params: z.object({
    bikeId: ObjectIdSchema
  })
});

export const createBikeValidator = z.object({
  body: NewBike
});

export const updateBike = z.object({
  body: UpdateBike
});

export const updateBikeStatusValidator = z.object({
  query: z.object({
    status: z.enum(BIKE_STATUS)
  })
});
