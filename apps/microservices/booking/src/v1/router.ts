import { Router } from 'express';
import * as Validator from './validator';
import { Booking, validate } from '@bikers-community/models';
import { BookingController } from './controller';
import { Types } from 'mongoose';
import amqp, { Channel } from 'amqplib';
const router = Router();

router.get('/health', (req, res)=>{
  res.sendStatus(200);
});

router
  .route('/')
  .post(validate(Validator.newBookingValidator), async (req, res, next) => {
    try {
      const booking = await BookingController.newBooking(req.body, req.channel);
      res.status(201).json(booking);
    } catch (err) {
      next(err);
    }
  })
  .get(validate(Validator.getBookingListValidator), async (req, res, next) => {
    try {
      const bookingList: Booking[] = await BookingController.getBookingList(
        req.query.userId as unknown as Types.ObjectId
      );
      res.status(200).json(bookingList);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:bookingId')
  .get(validate(Validator.getBookingValidator), async (req, res, next) => {
    try {
      const booking = await BookingController.getBooking(
        req.params.bookingId as unknown as Types.ObjectId
      );
      res.status(200).json(booking);
    } catch (err) {
      next(err);
    }
  })
  .put(validate(Validator.finishBooking), async (req, res, next) => {
    try {
      const booking = await BookingController.finishBooking(
        req.params.bookingId as unknown as Types.ObjectId,
        req.channel
      );
      res.status(200).json(booking);
    } catch (err) {
      next(err);
    }
  });

export function consumeBrokerV1(channel: Channel, queue: string){
  channel.assertQueue(queue, {durable: false});
  channel.consume(queue,brokerRouter, {noAck: true});
}

async function brokerRouter(msg: amqp.Message|null): Promise<void>{
  if(!msg){
    return
  }
  const content = JSON.parse(msg.content.toString());
  console.log(`BROKER_MSG: ${content.action}`)
  console.log(content.body);
  new Promise((resolve, reject)=>{
    switch (content.action) {
      case "SET_BOOKING_STATUS":
        BookingController.updateBookingStatus(content.body.bookingId, content.body.newStatus)
          .then((booking)=>{
            if(!booking){
              reject(new Error("Booking not found"));
            }
            resolve(booking);
          });
        break;
      default:
        reject(new Error("Message not valid"));
    }
  }).then(()=>{
    console.log(`BROKER_STATUS: successs`)
  })
  .catch((err)=>{
    console.log(`BROKER_STATUS: error`);
    console.log(`BROKER_ERR: ${err}`);
  });
}


export const ApiRouterV1: Router = router;
