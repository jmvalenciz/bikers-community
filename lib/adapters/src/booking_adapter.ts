import { Channel } from 'amqplib';
import { Types } from "mongoose";

export class BookingAdapter {
  public static queue = "bookings";
  channel: Channel;
  constructor(channel: Channel){
    this.channel = channel;
  }
  async activateBooking(bookingId: Types.ObjectId): Promise<boolean> {
    await this.channel.assertQueue(BookingAdapter.queue, { durable: false });
    const data = {
      action: 'SET_BOOKING_STATUS',
      body: {
        bookingId,
        newStatus: "ACTIVE"
      }
    }
    return this.channel.sendToQueue(BookingAdapter.queue, Buffer.from(JSON.stringify(data)));
  }
  async failBooking(bookingId: Types.ObjectId): Promise<boolean> {
    await this.channel.assertQueue(BookingAdapter.queue, { durable: false });
    const data = {
      action: 'SET_BOOKING_STATUS',
      body: {
        bookingId,
        newStatus: "FAILED"
      }
    }
    return this.channel.sendToQueue(BookingAdapter.queue, Buffer.from(JSON.stringify(data)), {contentEncoding:"base64"});
  }
}
