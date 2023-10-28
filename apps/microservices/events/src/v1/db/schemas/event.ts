import { Event } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const EventSchema = new Schema<Event>({

    createdByAdminId: {
        type: Schema.ObjectId,
        required: true,
    },
    updatedByAdminId: {
        type: Schema.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    eventName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
},
    {
        minimize: false,
        versionKey: false,
        autoIndex: false,
        autoCreate: true,
        strict: true,
        strictQuery: true,
        collation: {
            locale: 'en_US',
            strength: 1,
            caseLevel: true,
            numericOrdering: true
        },
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);

export const EventDB = model<Event>('event', EventSchema);