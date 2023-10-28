import { Channel } from 'amqplib';
import { Types } from "mongoose";

export class BikeAdapter {
  queue = "bikes";
  channel: Channel;
  constructor(channel: Channel){
    this.channel = channel;
  }
  async freeBike(bikeId: Types.ObjectId): Promise<boolean> {
    await this.channel.assertQueue(this.queue, { durable: false });
    const data = {
      action: 'SET_BIKE_STATUS',
      body: {
        bikeId,
        newStatus: "AVAILABLE"
      }
    }
    return this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)));
  }
  async bookBike(bikeId: Types.ObjectId): Promise<boolean> {
    await this.channel.assertQueue(this.queue, { durable: false });
    const data = {
      action: 'SET_BIKE_STATUS',
      body: {
        bikeId,
        newStatus: "BOOKED"
      }
    }
    return this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)), {contentEncoding:"base64"});
  }
}