import { Types } from 'mongoose';
import { RouteDataStore } from './db/datastoreRoute';
import {  NewRoute, Route, UpdateRoute } from '@bikers-community/models';
import { Channel } from 'amqplib';

export class RouteController{

    static async newRoute(newRoute: NewRoute): Promise<Route> {
        const route = await RouteDataStore.newRoute(newRoute);
        return route; 
    }

    static async updateRoute(routeId: Types.ObjectId, updateRoute: UpdateRoute): Promise<Route | null> {
        return await RouteDataStore.updateRoute(routeId, updateRoute);
    }

    static async getRouteById(routeId: Types.ObjectId): Promise<Route | null> {
        return await RouteDataStore.getRouteById(routeId);
    }
    
    static async getRoutesList(): Promise<Route[]> {
        return await RouteDataStore.getRoutesList();
    }

    static async deleteRouteById(routeId: Types.ObjectId): Promise<Route | null> {
        return await RouteDataStore.deleteRouteById(routeId);
    }


}