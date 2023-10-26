import { Booking } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const BookingSchema = new Schema<Booking>( { }, {
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
