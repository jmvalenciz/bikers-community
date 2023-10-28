import { Router } from 'express';
import * as Validator from './validator';
import { User, validate } from '@bikers-community/models';
import { UserController } from './controller';
import { Types } from 'mongoose';
const router = Router();

router
  .route('/')
  .post(validate(Validator.newUserValidator), async (req, res) => {
    const user = await UserController.newUser(req.body); 
    res.status(201).json(user);
  
  });

router
  .route('/:userId')
  .get(validate(Validator.getUserValidator), async (req, res) => {
    const user = await UserController.getUser(
      req.params.userId as unknown as Types.ObjectId
    );
    res.status(200).json(user);
  })
  .put(validate(Validator.getUserValidator), async (req, res) => {
    const user = await UserController.getUser(
      req.params.userId as unknown as Types.ObjectId,
    );
    res.status(200).json(user);
  });

export const ApiRouterV1: Router = router;
