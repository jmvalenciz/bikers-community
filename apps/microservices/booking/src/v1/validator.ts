import { NewBooking, ObjectIdSchema } from '@bikers-community/models';
import { z } from 'zod';

export const getBookingValidator = z.object({
  params: z.object({
    bookingId: ObjectIdSchema,
  }),
});

export const newBookingValidator = z.object({
  body: NewBooking,
});

export const finishBooking = z.object({
  params: z.object({
    bookingId: ObjectIdSchema,
  }),
});

export const getBookingListValidator = z.object({
  query: z.object({
    userId: ObjectIdSchema,
  }),
});
