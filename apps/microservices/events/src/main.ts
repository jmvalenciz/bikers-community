import express, { NextFunction, Response } from 'express';
import morgan from 'morgan';
import amqplib, { Channel } from 'amqplib';
import { env } from './utils/enviroment';
import mongoose from 'mongoose';

import { ApiRouterEventV1 } from './v1/routerEvent';
import { ApiRouterRouteV1 } from './v1/routerRoute';

if(env.NODE_ENV != 'development'){
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.debug = ()=>{};
  }

const app = express();

app.disable('x-powered-by');
app.set('etag', false);
app.use(morgan('tiny'));

let channel: Channel;

app.use(express.json());

async function main() {

    try {
        const connection = await amqplib.connect(
          `amqp://${env.BROKER.HOST}:${env.BROKER.PORT}`
        );
        await mongoose.connect(
          `mongodb://${env.DB.USER}:${env.DB.PASSWORD}@${env.DB.HOST}:${env.DB.PORT}/events`,
          { authSource: 'admin' }
        );
        console.log("Connected to database")
        channel = await connection.createChannel();
    } catch (err) {
        console.log(err);
        process.exit(1);
        return;
    }

    console.log(
        `Broker listening at amqp://${env.BROKER.HOST}:${env.BROKER.PORT}`
    );

    const server = app.listen(env.PORT, () => {
        console.log(`Listening at http://localhost:${env.PORT}/api/events`);
    });
    app.use((req, _, next) => {
        req.channel = channel;
        next();
    });
    server.on('error', console.error);

    app.use('/api/v1/events', ApiRouterEventV1);
    app.use('/api/v1/routes', ApiRouterRouteV1);

    app.use((err: Error, _: any, res: Response, next: NextFunction): void => {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
        }
        next();
    });
}

main()