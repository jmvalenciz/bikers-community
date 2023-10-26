import { Bike } from '@bikers-community/models';
import { model, Schema } from 'mongoose';

const BikeSchema = new Schema<Bike>({
}, {
  minimize: false,
  versionKey: false,
  autoIndex: false,
  autoCreate: true,
  strict: true,
  strictQuery: true,
  collation:{
    locale: 'es_CO',
    strength: 1,
    caseLevel: true,
    numericOrdering: true
  },
  timestamps:{
    createdAt: true,
    updatedAt: true
  }
});

export const BikeDB = model<Bike>('bike', BikeSchema);
