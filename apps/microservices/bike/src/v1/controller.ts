import { Types } from 'mongoose';
import { BikeDataStore } from './db/datastore';
import { NewBike, Bike, BIKE_STATUS, UpdateBike } from '@bikers-community/models';

export class BikeController {
  static async newBike(
    newBike: NewBike,
  ): Promise<Bike> {
    const bike = await BikeDataStore.newBike(newBike);
    return bike;
  }

  static async getBike(bikeId: Types.ObjectId): Promise<Bike | null> {
    return await BikeDataStore.getBikeById(bikeId);
  }

  static async getBikeList(): Promise<Bike[]> {
    return await BikeDataStore.getBikeList();
  }

  static async updateBikeStatus(bikeId: Types.ObjectId, newStatus: typeof BIKE_STATUS): Promise<Bike|null> {
    return await BikeDataStore.updateBikeStatus(bikeId, newStatus);
  }

  static async updateBike(bikeId: Types.ObjectId, updateBike: UpdateBike): Promise<Bike|null>{
    return await BikeDataStore.updateBike(bikeId, updateBike);
  }
}
