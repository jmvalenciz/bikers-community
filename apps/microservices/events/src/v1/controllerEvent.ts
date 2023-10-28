import { Types } from 'mongoose';
import { EventDataStore } from './db/datastoreEvent';
import {  NewEvent, Event, UpdateEvent } from '@bikers-community/models';
import { Channel } from 'amqplib';

export class EventController{

    static async newEvent(newEvent: NewEvent): Promise<Event> {
        const event = await EventDataStore.newEvent(newEvent);
        return event;
    }

    static async updateEvent(eventId: Types.ObjectId, updateEvent: UpdateEvent): Promise<Event | null> {
        return await EventDataStore.updateEvent(eventId, updateEvent);
    }

    static async getEventById(eventId: Types.ObjectId): Promise<Event | null> {
        return await EventDataStore.getEventById(eventId);
    }
    
    static async getEventList(): Promise<Event[]> {
        return await EventDataStore.getEventList();
    }
    
    static async deleteEventById(eventId: Types.ObjectId): Promise<Event | null> {
        return await EventDataStore.deleteEventById(eventId);
    }

}