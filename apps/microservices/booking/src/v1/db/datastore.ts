import { HydratedDocument, Types } from 'mongoose';
import { BookingDB } from './schemas/booking';
import { Booking, NewBooking } from '@bikers-community/models';

export class BookingDataStore {
  static async getBookingById(
    bookingId: Types.ObjectId
  ): Promise<Booking | null> {
    return await BookingDB.findOne({ _id: bookingId }).lean();
  }

  static async getBookingByBikeId(
    bikeId: Types.ObjectId
  ): Promise<Booking | null> {
    return await BookingDB.findOne({ bikeId }).lean();
  }

  static async newBooking(newBooking: NewBooking): Promise<Booking> {
    const booking: HydratedDocument<Booking> = new BookingDB({
      ...newBooking,
      status: 'ACTIVE',
      createdAt: new Date(),
    });
    await booking.save();
    return booking;
  }

  static async getBookingListByUserId(
    userId: Types.ObjectId
  ): Promise<Booking[]> {
    return await BookingDB.find({ userId }).lean();
  }

  static async finishBooking(
    bookingId: Types.ObjectId
  ): Promise<Booking | null> {
    return await BookingDB.findOneAndUpdate(
      { _id: bookingId },
      { $set: { status: 'FINISHED' } },
      { new: true }
    ).lean();
  }
}
