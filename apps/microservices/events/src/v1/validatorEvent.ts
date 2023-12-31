import { NewEvent, ObjectIdSchema, UpdateEvent } from "@bikers-community/models";
import { z } from 'zod';

export const getEventValidator = z.object({
    params: z.object({
        eventId: ObjectIdSchema
    })
});

export const createEventValidator = z.object({
    body: NewEvent
});

export const updateEventValidator = z.object({
    body: UpdateEvent,
    params: z.object({
        eventId: ObjectIdSchema,
    })
});

export const deleteEventValidator = z.object({
    params: z.object({
        eventId: ObjectIdSchema,
    })
});


export const getEventListValidator = z.object({
});


