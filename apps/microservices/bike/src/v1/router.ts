import { Router } from 'express';
import * as Validator from './validator';
import { Bike, validate } from '@bikers-community/models';
import { BikeController } from './controller';
import { Types } from 'mongoose';
import amqp, { Channel } from 'amqplib';
import { BookingAdapter } from '@bikers-community/adapters';

const router = Router();

router.get('/health', (req, res)=>{
  res.sendStatus(200);
});

router
  .route('/')
  .post(validate(Validator.newBikeValidator), async (req, res, next) => {
    try {
      const bike = await BikeController.newBike(req.body);
      res.status(201).json(bike);
    } catch (err) {
      next(err);
    }
  })
  .get(validate(Validator.getBikeListValidator), async (req, res, next) => {
    try {
      const bikeList: Bike[] = await BikeController.getBikeList();
      res.status(200).json(bikeList);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:bikeId')
  .get(validate(Validator.getBikeValidator), async (req, res, next) => {
    try {
      const bike = await BikeController.getBike(
        req.params.bikeId as unknown as Types.ObjectId
      );
      res.status(200).json(bike);
    } catch (err) {
      next(err);
    }
  })
  .put(validate(Validator.updateBikeValidator), async (req, res, next) => {
    try {
      const bike = await BikeController.updateBike(req.params.bikeId as unknown as Types.ObjectId, req.body);
      res.status(200).json(bike);
    } catch (err){
      next(err);
    }
  })

export function consumeBrokerV1(channel: Channel, queue: string){
  channel.assertQueue(queue, {durable: false});
  channel.consume(
    queue,
    (msg) => {
      if (!msg) {
        return;
      }
      const content = JSON.parse(msg.content.toString());
      console.log(`BROKER_MSG: ${content.action}`);
      console.log(content.body);
      new Promise((resolve, reject) => {
        switch (content.action) {
          case 'SET_BIKE_STATUS':
            BikeController.updateBikeStatus(
              content.body.bikeId,
              content.body.newStatus
            ).then((bike) => {
              if (!bike) {
                reject(new Error('Bike not found'));
              }
              resolve(bike);
            });
            break;
          default:
            reject(new Error('Message not valid'));
        }
      })
        .then(() => {
          new BookingAdapter(channel).activateBooking(content.body.bookingId);
          console.log(`BROKER_STATUS: successs`);
        })
        .catch((err) => {
          new BookingAdapter(channel).failBooking(content.body.bookingId);
          console.log(`BROKER_STATUS: error`);
          console.log(`BROKER_ERR: ${err}`);
        });
    },
    { noAck: true }
  );
}

export const ApiRouterV1: Router = router;
