import { HydratedDocument, Types } from 'mongoose';
import { BookingDB } from './schemas/booking';
import { BOOKING_STATUS, Booking, NewBooking } from '@bikers-community/models';

export class BookingDataStore {
  static async getBookingById(
    bookingId: Types.ObjectId
  ): Promise<Booking | null> {
    return await BookingDB.findOne({ _id: bookingId }).lean();
  }

  static async getBookingByBikeId(
    bikeId: Types.ObjectId
  ): Promise<Booking | null> {
    return await BookingDB.findOne({ bikeId, status:"ACTIVE" }).lean();
  }

  static async newBooking(newBooking: NewBooking): Promise<Booking> {
    const booking: HydratedDocument<Booking> = new BookingDB({
      ...newBooking,
      status: 'VALIDATING',
      createdAt: new Date(),
    });
    await booking.save();
    return booking;
  }

  static async updateBookingStatus(bookingId: Types.ObjectId, newStatus: typeof BOOKING_STATUS): Promise<Booking|null>{
    return await BookingDB.findOneAndUpdate({_id: bookingId},{status:newStatus}).lean();
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
      { status: 'FINISHED', finishedAt: new Date() },
      { new: true }
    ).lean();
  }
}
