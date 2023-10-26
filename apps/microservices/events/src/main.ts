/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import amqplib, { Channel, Connection } from 'amqplib';
import { env } from './utils/enviroment';

import { ApiRouterEventV1 } from './v1/routerEvent';

const app = express();

let channel: Channel;
let connection: Connection;

app.use(express.json());

async function main() {
    connection = await amqplib.connect(`amqp://${env.BROKER.URL}:${env.BROKER.PORT}`);
    channel = await connection.createChannel();
    channel.assertQueue(env.BROKER.QUEUE, { durable: false });
    const server = app.listen(env.PORT, () => {
        console.log(`Listening at http://localhost:${env.PORT}/api`);
    });
    app.use((req, _, next) => {
        req.channel = channel;
        next();
    })
    server.on('error', console.error);
    app.use('/api/v1/events', ApiRouterEventV1);
}

main()