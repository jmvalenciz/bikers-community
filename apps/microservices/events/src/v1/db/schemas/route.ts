import { Route } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const RouteSchema = new Schema<Route>({
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

export const RouteDB = model<Route>('route', RouteSchema);