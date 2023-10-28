import { Types } from 'mongoose';
import { BookingDataStore } from './db/datastore';
import { NewBooking, Booking, BOOKING_STATUS } from '@bikers-community/models';
import { BikeAdapter } from '@bikers-community/adapters';
import { Channel } from 'amqplib';

export class BookingController {
  static async newBooking(
    newBooking: NewBooking,
    channel: Channel
  ): Promise<Booking> {
    const oldBooking = await BookingDataStore.getBookingByBikeId(
      newBooking.bikeId
    );
    if (oldBooking != null) {
      throw Error('Bike is not available');
    }
    const booking = await BookingDataStore.newBooking(newBooking);
    new BikeAdapter(channel).bookBike(booking.bikeId, booking._id);
    return booking;
  }

  static async getBooking(bookingId: Types.ObjectId): Promise<Booking | null> {
    return await BookingDataStore.getBookingById(bookingId);
  }

  static async finishBooking(
    bookingId: Types.ObjectId,
    channel: Channel
  ): Promise<Booking> {
    let booking = await BookingDataStore.getBookingById(bookingId);
    if (!booking) {
      throw Error('Booking not found');
    }
    if (booking.status != 'ACTIVE') {
      throw Error('Not valid status');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    booking = (await BookingDataStore.finishBooking(bookingId))!;
    new BikeAdapter(channel).freeBike(booking.bikeId, booking._id);
    return booking;
  }

  static async updateBookingStatus(bookingId: Types.ObjectId, newStatus: typeof BOOKING_STATUS): Promise<Booking|null>{
    return await BookingDataStore.updateBookingStatus(bookingId, newStatus);
  }

  static async getBookingList(userId: Types.ObjectId): Promise<Booking[]> {
    return await BookingDataStore.getBookingListByUserId(userId);
  }
}
