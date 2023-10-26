import { Channel } from 'amqplib';

export {};

declare global {
  namespace Express {
    export interface Request {
      channel: Channel;
    }
  }
}
