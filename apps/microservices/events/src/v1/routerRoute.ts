import { Router } from 'express';
import * as Validator from './validatorRoute';
import { Route, validate } from '@bikers-community/models';
import { RouteController } from './controllerRoute';
import { Types } from 'mongoose';

const router = Router();

router
    .route('/')
    .post(validate(Validator.createRouteValidator),async (req, res) => {
        const route = await RouteController.newRoute(req.body, req.channel);
        res.status(201).json(route);
    })

router
    .route('/:routeId')
    .get(validate(Validator.getRouteValidator),async (req, res) => {
        const route = await RouteController.getRouteById(
            req.params.routeId as unknown as Types.ObjectId
        );
        res.status(200).json(route);
    })
    .delete(validate(Validator.deleteRouteValidator),async (req, res) => {
        RouteController.deleteRouteById(
            req.params.routeId as unknown as Types.ObjectId
        );
        res.status(200).send("Event deleted");
    })


export const ApiRouterRouteV1 = router;