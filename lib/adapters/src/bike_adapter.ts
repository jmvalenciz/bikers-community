import { Channel } from 'amqplib';
import { Types } from "mongoose";

export class BikeAdapter {
  queue = "bikes";
  channel: Channel;
  constructor(channel: Channel){
    this.channel = channel;
  }

  async getBike(bikeId: Types.ObjectId, replyTo: string): Promise<boolean> {
    const data = {
      action: 'GET_BIKE',
      body: {
        bikeId
      }
    }
    return this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)), {replyTo});
  }
  async freeBike(bikeId: Types.ObjectId): Promise<boolean> {
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
    const data = {
      action: 'SET_BIKE_STATUS',
      body: {
        bikeId,
        newStatus: "BOOKED"
      }
    }
    return this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)));
  }
}
