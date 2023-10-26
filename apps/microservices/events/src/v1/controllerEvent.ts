import { Types } from 'mongoose';
import { EventDataStore } from './db/datastoreEvent';
import {  NewEvent, Event, UpdateEvent } from '@bikers-community/models';
import { Channel } from 'amqplib';

export class EventController{

    static async newEvent(
        newEvent: NewEvent,
        channel: Channel
    ): Promise<Event> {
        const event = await EventDataStore.newEvent(newEvent);
        return event;
    }

    //se actualiza por id?
    static async updateEvent(
        updateEvent: UpdateEvent,
        channel: Channel
    ): Promise<Event> {
        const event = await EventDataStore.updateEvent(updateEvent);
        return event;
    }

    static async getEventById(eventId: Types.ObjectId): Promise<Event | null> {
        return await EventDataStore.getEventById(eventId);
    }

    static async deleteEventById(eventId: Types.ObjectId): Promise<Event | null> {
        return await EventDataStore.deleteEventById(eventId);
    }

    static async getEventList(): Promise<Event[]> {
        return await EventDataStore.getEventList();
    }
}