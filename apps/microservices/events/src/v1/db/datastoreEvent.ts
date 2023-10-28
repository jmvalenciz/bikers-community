import { HydratedDocument, Types } from "mongoose";
import { EventDB } from "./schemas/event";
import { Event, NewEvent, UpdateEvent } from "@bikers-community/models";

export class EventDataStore{
    static async getEventById(eventId: Types.ObjectId): Promise<Event|null>{
        return await EventDB.findOne({ _id:eventId }).lean();
    }

    static async newEvent(newEvent: NewEvent): Promise<Event>{
        const event: HydratedDocument<Event> = new EventDB({
            ...newEvent,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedByAdminId: newEvent.createdByAdminId
        });
        await event.save();
        return event;
    }

    static async getEventList(): Promise<Event[]>{
        return await EventDB.find().lean();
    }

    static async updateEvent(eventId: Types.ObjectId, updateEvent: UpdateEvent): Promise<Event | null> {
        return await EventDB.findOneAndUpdate(
            { _id: eventId },
            { $set: {...updateEvent, updatedAt: new Date()} },
            { new: true }
        ).lean();
    }

    static async deleteEventById(eventId: Types.ObjectId): Promise<Event|null>{
        return await EventDB.findOneAndDelete({ _id:eventId }).lean();
    }

}