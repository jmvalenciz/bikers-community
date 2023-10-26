import { z } from 'zod';
import { ObjectIdSchema } from './general/object_id';

export const Route = z.object({
    routeId: ObjectIdSchema,
    createdByAdminId: ObjectIdSchema,
    updatedByAdminId: ObjectIdSchema,
    updatedAt: z.date(),
    createdAt: z.date(),
    routeName: z.string().min(3).max(250),
    routeLocation: z.object({
        type: z.literal('Point'),
        coordinates: z.number().array(),
    }),
    description: z.string().min(3).max(500),
    routeDate: z.date()
});
export const NewRoute = Route.omit({
    routeId: true,
    updatedByAdminId: true,
    updatedAt: true,
});
export const UpdateRoute = Route.omit({
    routeId: true,
    createdByAdminId: true,
    createdAt: true,
});

export type Route = z.infer<typeof Route>;
export type NewRoute = z.infer<typeof NewRoute>;
export type UpdateRoute = z.infer<typeof UpdateRoute>;