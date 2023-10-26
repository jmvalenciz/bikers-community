import { NewEvent, ObjectIdSchema, UpdateEvent } from "@bikers-community/models";
import { z } from 'zod';

export const getEventValidator = z.object({
    params: z.object({
        eventId: ObjectIdSchema
    })
});

//esta correcto?
export const deleteEventValidator = z.object({
    params: z.object({
        eventId: ObjectIdSchema
    })
});

export const createEventValidator = z.object({
    body: NewEvent
});

export const updateEvent = z.object({
    body: UpdateEvent
});



