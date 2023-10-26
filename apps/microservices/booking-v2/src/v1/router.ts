import { Router } from 'express';
import * as Validator from './validator';
import { Booking, validate } from '@bikers-community/models';
import { BookingController } from './controller';
import { Types } from 'mongoose';
const router = Router();

router
  .route('/')
  .post(validate(Validator.newBookingValidator), async (req, res) => {
    const booking = await BookingController.newBooking(req.body, req.channel);
    res.status(201).json(booking);
  })
  .get(validate(Validator.getBookingListValidator), async (req, res) => {
    const bookingList: Booking[] = await BookingController.getBookingList(
      req.query.userId as unknown as Types.ObjectId
    );
    res.status(200).json(bookingList);
  });

router
  .route('/:bookingId')
  .get(validate(Validator.getBookingValidator), async (req, res) => {
    const booking = await BookingController.getBooking(
      req.params.bookingId as unknown as Types.ObjectId
    );
    res.status(200).json(booking);
  })
  .put(validate(Validator.finishBooking), async (req, res) => {
    const booking = await BookingController.finishBooking(
      req.params.bookingId as unknown as Types.ObjectId,
      req.channel
    );
    res.status(200).json(booking);
  });

export const ApiRouterV1: Router = router;
