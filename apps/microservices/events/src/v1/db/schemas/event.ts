import { Event } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const EventSchema = new Schema<Event>({
}, {
    minimize: false,
    versionKey: false,
    autoIndex: false,
    autoCreate: true,
    strict: true,
    strictQuery: true,
    collation: {
        locale: 'es_CO',
        strength: 1,
        caseLevel: true,
        numericOrdering: true
    },
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});

export const EventDB = model<Event>('event', EventSchema);