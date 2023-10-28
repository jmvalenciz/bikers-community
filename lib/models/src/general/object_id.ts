import { Types } from 'mongoose';
import { z } from 'zod';

export const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/).transform((arg)=>new Types.ObjectId(arg));

export type ObjectId = z.infer<typeof ObjectIdSchema>;
