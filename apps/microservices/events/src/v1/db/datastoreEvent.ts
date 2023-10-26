import { HydratedDocument, Types } from "mongoose";
import { EventDB } from "./schemas/event";
import { Event, NewEvent, UpdateEvent } from "@bikers-community/models";

export class EventDataStore{
    static async getEventById(eventId: Types.ObjectId): Promise<Event|null>{
        return await EventDB.findOne({eventId}).lean();
    }

    static async newEvent(newEvent: NewEvent): Promise<Event>{
        const event: HydratedDocument<Event> = new EventDB(newEvent);
        await event.save();
        return event;
    }

    // se actualiza por id?
    static async updateEvent(updateEvent: UpdateEvent): Promise<Event> {
        const event: HydratedDocument<Event> = new EventDB(updateEvent);
        await event.save();
        return event;
    }

    static async deleteEventById(eventId: Types.ObjectId): Promise<Event|null>{
        return await EventDB.findOneAndDelete({eventId}).lean();
    }

    //deberia retornar todos los eventos 
    static async getEventList(): Promise<Event[]>{
        return await EventDB.find().lean();
    }
}