import {z} from 'zod';
import { ObjectIdSchema } from './general/object_id';

export const Point = z.object({
  lng: z.number(),
  lat: z.number()
});

export const BikeLocation = z.object({
  bikeId: ObjectIdSchema,
  bookingId: ObjectIdSchema,
  points: z.array(Point)
});

export type Point = z.infer<typeof Point>;
export type BikeLocation = z.infer<typeof BikeLocation>;
