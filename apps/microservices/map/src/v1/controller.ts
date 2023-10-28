import { Types } from 'mongoose';
import { BikeLocationDataStore } from './db/datastore';
import { BikeLocation, Point } from '@bikers-community/models';


export class BikeLocationController {
  static async setupBikeLocation(
    bikeId: Types.ObjectId, bookingId: Types.ObjectId
  ): Promise<BikeLocation> {
    const bikeLocation = await BikeLocationDataStore.setupBikeLocation(bikeId, bookingId);
    return bikeLocation;
  }

  static async getBikeLocation(bikeId: Types.ObjectId, bookingId: Types.ObjectId): Promise<BikeLocation | null> {
    return await BikeLocationDataStore.getBikeLocationById(bikeId, bookingId);
  }

  static async insertPoint(bikeId: Types.ObjectId, bookingId: Types.ObjectId, point: Point): Promise<BikeLocation|null>{
    return await BikeLocationDataStore.addPointToBikeLocation(bikeId, bookingId, point);
  }

  static onBikeLocationChange(bikeId: Types.ObjectId, bookingId: Types.ObjectId, callback: (stream: BikeLocation)=>void): void{
    BikeLocationDataStore.onChange((bikeLocation)=>{
      console.log(bikeLocation)
      if(bikeLocation.bikeId.toString()==bikeId.toString()&&bikeLocation.bookingId.toString()==bookingId.toString()){
        callback(bikeLocation);
      }
    });
  }
}
