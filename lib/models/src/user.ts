import { z } from 'zod';
import { ObjectIdSchema } from './general/object_id';
import mongoose from 'mongoose';

export const User = z.object({
  userId: ObjectIdSchema,
  userName: z.string().min(3).max(250),
  createdByAdminId: ObjectIdSchema,
  updatedByAdminId: ObjectIdSchema,
  updatedAt: z.date(),
  createdAt: z.date()
});

export const UserData = z.object({
  createdAt: z.date()
});




export const NewUser = User.omit({
  userId: true,
  updatedAt:true,
  createdAt:true
});
export const UpdateUser = User.omit({
  userId: true,
  userName: true,
  updatedByAdminId: true,
  updatedAt: true
});

export type User = z.infer<typeof User>;
export type UserData = z.infer<typeof UserData>;

export type NewUser = z.infer<typeof NewUser>;
export type UpdateUser = z.infer<typeof UpdateUser>;
