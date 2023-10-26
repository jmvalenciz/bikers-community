import { HydratedDocument, Types } from 'mongoose';
import { BookingDB } from './schemas/booking';
import { Booking, NewBooking } from '@bikers-community/models';

export class BookingDataStore {
  static async getBookingById(
    bookingId: Types.ObjectId
  ): Promise<Booking | null> {
    return await BookingDB.findOne({ bookingId }).lean();
  }

  static async newBooking(newBooking: NewBooking): Promise<Booking> {
    const booking: HydratedDocument<Booking> = new BookingDB({
      ...newBooking,
      status: 'ACTIVE',
    });
    await booking.save();
    return booking;
  }

  static async deleteBookingById(
    bookingId: Types.ObjectId
  ): Promise<Booking | null> {
    return await BookingDB.findOneAndDelete({ bookingId }).lean();
  }

  static async getBookingListByUserId(
    userId: Types.ObjectId
  ): Promise<Booking[]> {
    return await BookingDB.find({ userId }).lean();
  }

  static async isBikeAlreadyBooked(bookingId: Types.ObjectId) {
    return await BookingDB.exists({ bookingId }).lean();
  }

  static async finishBooking(
    bookingId: Types.ObjectId
  ): Promise<Booking | null> {
    return await BookingDB.findOneAndUpdate(
      { bookingId },
      { $set: { status: 'FINISHED' } },
      { new: true }
    ).lean();
  }
}
