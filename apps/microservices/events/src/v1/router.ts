import { Router } from 'express';
import * as Validator from './validator';
import { Event, validate } from '@bikers-community/models';
import { EventController } from './controller';
import { Types } from 'mongoose';
const router = Router();

router
    .route('/')
    .post(validate(Validator.createEventValidator), async(req, res) => {
        const event = await EventController.newEvent(req.body, req.channel);
        res.status(201).json(event);
    })

router
    .route('/:eventId')
    .get(validate(Validator.getEventValidator),async (req, res) => {
        const event = await EventController.getEventById(
            req.params.eventId as unknown as Types.ObjectId
        );
        res.status(200).json(event);
    })
    .delete(async (req, res) => {
        EventController.deleteEventById(
            req.params.eventId as unknown as Types.ObjectId
        );
        res.status(200).send("Event deleted")
    })
    

export const ApiRouterV1 = router;