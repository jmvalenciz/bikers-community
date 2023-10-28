import express, { NextFunction, Response } from 'express';
import morgan from 'morgan';
import { env } from './utils/environment';
import mongoose, { Types } from 'mongoose';
import expressWs from 'express-ws';

import { ApiRouterV1 } from './v1/router';
import { BikeLocationController } from './v1/controller';

if (env.NODE_ENV != 'development') {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.debug = () => {};
}

const app = expressWs(express()).app;

app.disable('x-powered-by');
app.set('etag', false);
app.use(morgan('tiny'));

app.use(express.json());

app.ws('/api/map/v1/ws/:bikeId/:bookingId', (ws, req, next)=>{
  BikeLocationController.onBikeLocationChange(new Types.ObjectId(req.params.bikeId), new Types.ObjectId(req.params.bookingId), (bikeLocation)=>{
    ws.send(JSON.stringify(bikeLocation));
  });
});

async function main() {
  try {
    await mongoose.connect(
      `mongodb://${env.DB.USER}:${env.DB.PASSWORD}@${env.DB.HOST}:${env.DB.PORT}/bikes`,
      { authSource: 'admin' }
    );
    console.log("Connected to database")
  } catch (err) {
    console.log(err);
    process.exit(1);
    return;
  }
  const server = app.listen(env.PORT, () => {
    console.log(`Listening at http://localhost:${env.PORT}/api/map`);
  });
  server.on('error', console.error);
  app.use('/api/map/v1', ApiRouterV1);
  app.use((err: Error, _: any, res: Response, next: NextFunction): void => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
    }
    next();
  });
}

main();
