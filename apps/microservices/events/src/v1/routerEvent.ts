import { Router } from 'express';
import * as Validator from './validatorEvent';
import { Event, validate } from '@bikers-community/models';
import { EventController } from './controllerEvent';
import { Types } from 'mongoose';

const router = Router();

router.get('/health', (req, res, next)=>{
    res.sendStatus(200);
    next();
});
  

router
    .route('/')
    .post(validate(Validator.createEventValidator), async (req, res, next) => {
        try{
            const event = await EventController.newEvent(req.body);
            res.status(201).json(event);
        } catch(err) {
            next(err);
        }
    })
    .get(validate(Validator.getEventListValidator), async (req, res, next) => {
        try{
            const eventList: Event[] = await EventController.getEventList();
            res.status(200).json(eventList);
        } catch(err) {
            next(err);
        }
    })

router
    .route('/:eventId')
    .get(validate(Validator.getEventValidator), async (req, res, next) => {
        try {
            const event = await EventController.getEventById(
              req.params.eventId as unknown as Types.ObjectId
            );
            res.status(200).json(event);
        } catch (err) {
            next(err);
        }
    })
    .put(validate(Validator.updateEventValidator), async (req, res, next) =>{
        try {
            const event = await EventController.updateEvent(
                req.params.eventId as unknown as Types.ObjectId, req.body
            );
            res.status(200).json(event);
        } catch (err){
            next(err);
        }
    })
    .delete(validate(Validator.getEventValidator), async (req, res) => {
        EventController.deleteEventById(
            req.params.eventId as unknown as Types.ObjectId
        );
        res.status(200).send("Event deleted")
    })
    

export const ApiRouterEventV1 = router;