import { Route } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const RouteSchema = new Schema<Route>({
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
    routeName: {
        type: String,
        required: true
    },
    routeLocation: {
        lng: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    routeDate: {
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

export const RouteDB = model<Route>('route', RouteSchema);