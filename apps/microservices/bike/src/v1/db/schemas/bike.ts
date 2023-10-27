import { Bike, BIKE_STATUS } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const BikeSchema = new Schema<Bike>(
  {
    status: {
      type: String,
      enum: BIKE_STATUS,
      default: 'AVAILABLE',
    },
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
    updatedAt:{
      type: Date,
      default: new Date()
    },
    color:{
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    },
    model:{
      type: String,
      required: true
    }
  },
  {
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
    },
  }
);

export const BikeDB = model<Bike>('bike', BikeSchema);
