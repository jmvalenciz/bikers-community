import { Router } from 'express';
import * as Validator from './validator';
import { Bike, validate } from '@bikers-community/models';
import { BikeController } from './controller';
import { Types } from 'mongoose';
const router = Router();

router.get('/health', (req, res, next)=>{
  res.sendStatus(200);
  next();
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

export const ApiRouterV1: Router = router;
