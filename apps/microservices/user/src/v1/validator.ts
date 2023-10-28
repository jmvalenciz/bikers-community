import { NewUser, ObjectIdSchema } from '@bikers-community/models';
import { z } from 'zod';

export const getUserValidator = z.object({
  params: z.object({
    userId: ObjectIdSchema,
  }),
});

export const newUserValidator = z.object({
  body: NewUser,
});
 
export const finishUser = z.object({
  params: z.object({
    userId: ObjectIdSchema,
  }),
});

export const getUserListValidator = z.object({
  query: z.object({
    userId: ObjectIdSchema,
  }),
});
