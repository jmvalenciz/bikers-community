import { HydratedDocument, Types } from "mongoose";
import { RouteDB } from "./schemas/route";
import { Route, NewRoute, UpdateRoute } from "@bikers-community/models";

export class RouteDataStore{
    static async getRouteById(routeId: Types.ObjectId): Promise<Route|null> {
        return await RouteDB.findOne({routeId}).lean();
    }

    static async newRoute(newRoute: NewRoute): Promise<Route> {
        const route: HydratedDocument<Route> = new RouteDB(newRoute);
        await route.save();
        return route;
    } 

    static async updateRoute(updateRoute: UpdateRoute): Promise<Route> {
        const route: HydratedDocument<Route> = new RouteDB(updateRoute);
        await route.save();
        return route;
    } 

    static async deleteRouteById(routeId: Types.ObjectId): Promise<Route|null> {
        return await RouteDB.findOneAndDelete({routeId}).lean();
    }

    //deberia retornar todos las rutas 
    static async getRoutesList(): Promise<Route[]> {
        return await RouteDB.find().lean();
    }

}