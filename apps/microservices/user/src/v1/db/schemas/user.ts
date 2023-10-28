import { User } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const UserSchema = new Schema<User>({
  createdByAdminId: {
    type: Schema.ObjectId,
    required: true,
  },
  updatedByAdminId: { 
    type: Schema.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
  userName: {
    type: String,
    required: true
  }
}, {
  minimize: false,
  versionKey: false,
  autoIndex: false,
  autoCreate: true,
  strict: true,
  strictQuery: true,
  collation: {
    locale: 'en_US',
    strength: 1,
    caseLevel: true,
    numericOrdering: true,
  },
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
}
);

export const UserDB = model<User>('user', UserSchema);
