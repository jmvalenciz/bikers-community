import { Booking } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const BookingSchema = new Schema<Booking>(
  {
    status: {
      typeKey: String,
      default: 'ACTIVE',
    },
  },
  {
    minimize: false,
    versionKey: false,
    autoIndex: false,
    autoCreate: true,
    strict: true,
    strictQuery: true,
    collation: {
      locale: 'es_CO',
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
