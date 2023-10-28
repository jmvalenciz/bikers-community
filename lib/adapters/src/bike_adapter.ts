import { Channel } from 'amqplib';
import { Types } from "mongoose";

export class BikeAdapter {
  public static queue = "bikes";
  channel: Channel;
  constructor(channel: Channel){
    this.channel = channel;
  }
  async freeBike(bikeId: Types.ObjectId, bookingId: Types.ObjectId): Promise<boolean> {
    await this.channel.assertQueue(BikeAdapter.queue, { durable: false });
    const data = {
      action: 'SET_BIKE_STATUS',
      body: {
        bikeId,
        bookingId,
        newStatus: "AVAILABLE"
      }
    }
    return this.channel.sendToQueue(BikeAdapter.queue, Buffer.from(JSON.stringify(data)));
  }
  async bookBike(bikeId: Types.ObjectId, bookingId: Types.ObjectId): Promise<boolean> {
    await this.channel.assertQueue(BikeAdapter.queue, { durable: false });
    const data = {
      action: 'SET_BIKE_STATUS',
      body: {
        bikeId,
        bookingId,
        newStatus: "BOOKED"
      }
    }
    return this.channel.sendToQueue(BikeAdapter.queue, Buffer.from(JSON.stringify(data)), {contentEncoding:"base64"});
  }
}
