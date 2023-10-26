import { Types } from 'mongoose';
import { BookingDataStore } from './db/datastore';
import { NewBooking, Booking } from '@bikers-community/models';
import { BikeAdapter } from '@bikers-community/adapters';
import { Channel } from 'amqplib';

export class BookingController {
  static async newBooking(
    newBooking: NewBooking,
    channel: Channel
  ): Promise<Booking> {
    if (await BookingDataStore.isBikeAlreadyBooked(newBooking.bikeId)) {
      throw Error('Bike is already booked');
    }
    const bike = await BookingDataStore.newBooking(newBooking);
    new BikeAdapter(channel).bookBike(bike.bikeId);
    return bike;
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
    new BikeAdapter(channel).freeBike(booking.bikeId);
    return booking;
  }

  static async getBookingList(userId: Types.ObjectId): Promise<Booking[]> {
    return await BookingDataStore.getBookingListByUserId(userId);
  }
}
