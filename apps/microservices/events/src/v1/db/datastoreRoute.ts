import { HydratedDocument, Types } from "mongoose";
import { RouteDB } from "./schemas/route";
import { Route, NewRoute, UpdateRoute } from "@bikers-community/models";

export class RouteDataStore{
    static async getRouteById(routeId: Types.ObjectId): Promise<Route|null> {
        return await RouteDB.findOne({ _id:routeId }).lean();
    }

    static async newRoute(newRoute: NewRoute): Promise<Route> {
        const route: HydratedDocument<Route> = new RouteDB({
            ...newRoute,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedByAdminId: newRoute.createdByAdminId
        });
        await route.save();
        return route;
    } 
    
    static async getRoutesList(): Promise<Route[]> {
        return await RouteDB.find().lean();
    }

    static async updateRoute(routeId: Types.ObjectId, updateRoute: UpdateRoute): Promise<Route | null> {
        return await RouteDB.findOneAndUpdate(
            { _id: routeId },
            { $set: {...updateRoute, updatedAt: new Date()} },
            { new: true }
        ).lean();
    } 

    static async deleteRouteById(routeId: Types.ObjectId): Promise<Route|null> {
        return await RouteDB.findOneAndDelete({ _id:routeId }).lean();
    }


}