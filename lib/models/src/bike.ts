import { z } from 'zod';
import { ObjectIdSchema } from './general/object_id';
import { HexColor } from './general/hex_color';

export const BIKE_STATUS = [ 'AVAILABLE', 'BOOKED', 'UNAVAILABLE'] as const;

export const Bike = z.object({
  _id: ObjectIdSchema,
  createdByAdminId: ObjectIdSchema,
  updatedByAdminId: ObjectIdSchema,
  updatedAt: z.date(),
  createdAt: z.date(),
  color: HexColor,
  model: z.string().min(3).max(250),
  status: z.enum(BIKE_STATUS),
  description: z.string().min(3).max(200)
});
export const NewBike = Bike.omit({
  _id: true,
  createdAt: true,
  updatedByAdminId: true,
  updatedAt: true,
  status: true
});
export const UpdateBike = Bike.omit({
  _id: true,
  createdByAdminId: true,
  updatedAt: true,
  createdAt: true,
  status: true
});

export type Bike = z.infer<typeof Bike>;
export type NewBike = z.infer<typeof NewBike>;
export type UpdateBike = z.infer<typeof UpdateBike>;
