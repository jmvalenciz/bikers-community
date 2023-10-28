import { BikeLocation } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const BikeLocationSchema = new Schema<BikeLocation>(
  {
    bookingId: {
      type: Schema.ObjectId,
      required: true
    },
    bikeId: {
      type: Schema.ObjectId,
      required: true
    },
    points:{
      type: [{
        _id: false,
        lng: {
          type: Number,
          required: true
        },
        lat:{
          type: Number,
          required: true
        }
      }],
      default: []
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

export const BikeLocationDB = model<BikeLocation>('bike_locations', BikeLocationSchema);
