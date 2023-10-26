import { Types } from 'mongoose';
import { RouteDataStore } from './db/datastoreRoute';
import {  NewRoute, Route, UpdateRoute } from '@bikers-community/models';
import { Channel } from 'amqplib';

export class RouteController{

    static async newRoute(
        newRoute: NewRoute,
        channel: Channel
    ): Promise<Route> {
        const route = await RouteDataStore.newRoute(newRoute);
        return route; 
    }

    //se actualiza por id?
    static async updateRoute(
        updateRoute: UpdateRoute,
        channel: Channel
    ): Promise<Route> {
        const route = await RouteDataStore.updateRoute(updateRoute);
        return route; 
    }

    static async getRouteById(routeId: Types.ObjectId): Promise<Route | null> {
        return await RouteDataStore.getRouteById(routeId);
    }

    static async deleteRouteById(routeId: Types.ObjectId): Promise<Route | null> {
        return await RouteDataStore.deleteRouteById(routeId);
    }

    static async getRoutesList(): Promise<Route[]> {
        return await RouteDataStore.getRoutesList();
    }

}