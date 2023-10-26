import express from 'express';
import morgan from 'morgan';
import amqplib, { Channel } from 'amqplib';
import { env } from './utils/environment';
import mongoose from 'mongoose';

import { ApiRouterV1 } from './v1/router';

if(env.NODE_ENV != 'development'){
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.debug = ()=>{};
}

const app = express();

app.use(morgan('tiny'));

let channel: Channel;

app.use(express.json());

async function main() {
  try {
      const connection = await amqplib.connect(
      `amqp://${env.BROKER.URL}:${env.BROKER.PORT}`
      );
      await mongoose.connect(`mongodb://${env.DB.USER}:${env.DB.PASSWORD}@${env.DB.URL}:${env.DB.PORT}/booking`, {authSource:"admin"})
    channel = await connection.createChannel();
  } catch (err) {
    console.log(err)
    process.exit(1)
    return
  }
  await channel.assertQueue(env.BROKER.QUEUE, { durable: false });
  console.debug(`Broker listening at amqp://${env.BROKER.QUEUE}:${env.BROKER.PORT}\nQUEUE: ${env.BROKER.QUEUE}`);
  const server = app.listen(env.PORT, () => {
    console.debug(`Listening at http://localhost:${env.PORT}/api/booking`);
  });
  app.use((req, _, next) => {
    req.channel = channel;
    next();
  });
  server.on('error', console.error);
  app.use('/api/booking/v1', ApiRouterV1);
}

main();
