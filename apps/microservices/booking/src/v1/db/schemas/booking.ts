import { Booking, BOOKING_STATUS } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const BookingSchema = new Schema<Booking>(
  {
    status: {
      type: String,
      enum: BOOKING_STATUS,
      default: 'ACTIVE',
    },
    bikeId: {
      type: Schema.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    finishedAt: Date,
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

export const BookingDB = model<Booking>('booking', BookingSchema);
