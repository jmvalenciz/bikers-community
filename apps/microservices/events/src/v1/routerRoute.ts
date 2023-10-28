import { Router } from 'express';
import * as Validator from './validatorRoute';
import { Route, validate } from '@bikers-community/models';
import { RouteController } from './controllerRoute';
import { Types } from 'mongoose';

const router = Router();

router.get('/health', (req, res, next)=>{
    res.sendStatus(200);
    next();
});

router
    .route('/')
    .post(validate(Validator.createRouteValidator), async (req, res, next) => {
        try{
            const route = await RouteController.newRoute(req.body);
            res.status(201).json(route);
        } catch(err){
            next(err);
        }
    })
    .get(validate(Validator.getRouteListValidator), async (req, res, next) => {
        try{
            const routeList: Route[] = await RouteController.getRoutesList();
            res.status(200).json(routeList);
        } catch(err){
            next(err);
        }
    })

router
    .route('/:routeId')
    .get(validate(Validator.getRouteValidator), async (req, res, next) => {
        try{
            const route = await RouteController.getRouteById(
                req.params.routeId as unknown as Types.ObjectId
            );
            res.status(200).json(route);
        } catch(err){
            next(err);
        }
    })
    .put(validate(Validator.updateRouteValidator), async (req, res, next) => {
        try{
            const route = await RouteController.updateRoute(
                req.params.routeId as unknown as Types.ObjectId, req.body
            );
            res.status(200).json(route);

        } catch(err){
            next(err);
        }
    })
    .delete(validate(Validator.deleteRouteValidator), async (req, res, next) => {
        RouteController.deleteRouteById(
            req.params.routeId as unknown as Types.ObjectId
        );
        res.status(200).send("Route deleted");
    })


export const ApiRouterRouteV1 = router; 