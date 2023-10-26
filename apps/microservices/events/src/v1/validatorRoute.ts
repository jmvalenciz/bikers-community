import { NewRoute, ObjectIdSchema, UpdateRoute } from "@bikers-community/models";
import { z } from 'zod';

export const getRouteValidator = z.object({
    params: z.object({
        routeId: ObjectIdSchema
    })
});

//esta correcto?
export const deleteRouteValidator = z.object({
    params: z.object({
        routeId: ObjectIdSchema
    })
});

export const createRouteValidator = z.object({
    body: NewRoute
});

export const updateRouteValidator = z.object({
    body: UpdateRoute
});
