import { Router } from 'express';
import * as Validator from './validator';
import { validate } from '@bikers-community/models';
import { BikeLocationController } from './controller';
import { Types } from 'mongoose';

const router = Router();

router.get('/health', (req, res)=>{
  res.sendStatus(200);
});

router
  .route('/:bikeId/:bookingId')
  .get(validate(Validator.getBikeLocationValidator), async (req, res, next) => {
    try {
      const bike = await BikeLocationController.getBikeLocation(
        req.params.bikeId as unknown as Types.ObjectId,
        req.params.bookingId as unknown as Types.ObjectId,
      );
      res.status(200).json(bike);
    } catch (err) {
      next(err);
    }
  })
  .put(validate(Validator.insertPointValidator), async (req, res, next) => {
    try {
      const bike = await BikeLocationController.insertPoint(req.params.bikeId as unknown as Types.ObjectId, req.params.bookingId as unknown as Types.ObjectId, req.body);
      res.status(200).json(bike);
    } catch (err){
      next(err);
    }
  })
  .post(validate(Validator.setupBikeLocationValidator), async (req, res, next)=>{
    try{
      const bikeLocation = await BikeLocationController.setupBikeLocation(req.params.bikeId as unknown as Types.ObjectId, req.params.bookingId as unknown as Types.ObjectId);
      res.status(201).json(bikeLocation);
    } catch(err){
      next(err)
    }
  });

export const ApiRouterV1: Router = router;
