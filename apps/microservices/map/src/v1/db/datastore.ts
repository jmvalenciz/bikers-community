import { HydratedDocument, Types } from 'mongoose';
import { BikeLocationDB } from './schemas/bike_location';
import { BikeLocation, Point } from '@bikers-community/models';
import { EventEmitter } from 'stream';

export class BikeLocationDataStore {
  static eventEmitter = new EventEmitter();

  static async getBikeLocationById(
    bikeId: Types.ObjectId, bookingId: Types.ObjectId
  ): Promise<BikeLocation | null> {
    return await BikeLocationDB.findOne({ bikeId, bookingId }).lean();
  }

  static async setupBikeLocation(bikeId: Types.ObjectId, bookingId: Types.ObjectId): Promise<BikeLocation> {
    const bikeLocation: HydratedDocument<BikeLocation> = new BikeLocationDB({
      bikeId,
      bookingId,
      points:[]
    });
    await bikeLocation.save();
    return bikeLocation;
  }

  static async addPointToBikeLocation(bikeId: Types.ObjectId, bookingId: Types.ObjectId, point: Point){
    const bikeLocation = await BikeLocationDB.findOneAndUpdate({ bikeId, bookingId }, {$push:{points:point}}, {new: true}).lean();
    this.eventEmitter.emit('setPoint', bikeLocation);
    return bikeLocation;
  }

  static onChange(callback: (stream: BikeLocation)=>void ){
    return BikeLocationDataStore.eventEmitter.on('setPoint', callback);
  }

}
