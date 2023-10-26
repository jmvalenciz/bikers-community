import { z } from 'zod';
import { ObjectIdSchema } from './general/object_id';

export const BOOKING_STATUS = ['ACTIVE', 'FINISHED'] as const;

export const Booking = z.object({
  bookingId: ObjectIdSchema,
  bikeId: ObjectIdSchema,
  userId: ObjectIdSchema,
  createdAt: z.date(),
  status: z.enum(BOOKING_STATUS),
  finishedAt: z.date().optional()
});
export const NewBooking = Booking.omit({
  bookingId: true,
  finishedAt: true,
  createdAt: true,
  status: true
});
export type Booking = z.infer<typeof Booking>;
export type NewBooking = z.infer<typeof NewBooking>;
