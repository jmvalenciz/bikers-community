import { Channel } from 'amqplib';
import { Types } from "mongoose";

export class BikeAdapter {
  queue = "notifications";
  channel: Channel;
  constructor(channel: Channel){
    this.channel = channel;
  }
  async sendMessageToTopic(title:string, message:string, topicName:string): Promise<boolean> {
    await this.channel.assertQueue(this.queue, { durable: false });
    const data = {
      action: 'sendMessageToTopic',
      body: {
        title,
        message,
        topicName
      }
    }
    return this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)));
  }
}
