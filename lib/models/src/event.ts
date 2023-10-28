import { z } from 'zod';
import { ObjectIdSchema } from './general/object_id';

export const Event = z.object({
    eventId: ObjectIdSchema,
    createdByAdminId: ObjectIdSchema,
    updatedByAdminId: ObjectIdSchema,
    updatedAt: z.date(),
    createdAt: z.date(),
    eventName: z.string().min(3).max(250),
    description: z.string().min(3).max(500),
    eventDate: z.coerce.date()
});
export const NewEvent = Event.omit({
    eventId: true,
    createdAt: true,
    updatedByAdminId: true,
    updatedAt: true
});
export const UpdateEvent = Event.omit({
    eventId: true,
    createdByAdminId: true,
    createdAt: true,
    updatedAt: true,
});

export type Event = z.infer<typeof Event>;
export type NewEvent = z.infer<typeof NewEvent>;
export type UpdateEvent = z.infer<typeof UpdateEvent>;