import { z } from 'zod';
import { ObjectIdSchema } from './general/object_id';

export const User = z.object({
  _id: ObjectIdSchema,
  userName: z.string().min(3).max(250),
  accessToken: z.string().min(3).max(250),
  authProvider: z.string().min(3).max(250),
  updatedAt: z.date(),
  createdAt: z.date()
});

export const NewUser = User.omit({
  _id: true,
  updatedAt:true,
  createdAt:true
});
export const UpdateUser = User.omit({
  _id: true,
  updatedAt:true,
  createdAt:true
});

export type User = z.infer<typeof User>;

export type NewUser = z.infer<typeof NewUser>;
export type UpdateUser = z.infer<typeof UpdateUser>; 
