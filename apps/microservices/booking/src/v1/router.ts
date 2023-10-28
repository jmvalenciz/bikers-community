import { Router } from 'express';
import * as Validator from './validator';
import { Booking, validate } from '@bikers-community/models';
import { BookingController } from './controller';
import { Types } from 'mongoose';
const router = Router();

router.get('/health', (req, res, next)=>{
  res.sendStatus(200);
  next();
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

export const ApiRouterV1: Router = router;
