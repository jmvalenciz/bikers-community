import { HydratedDocument, Types } from 'mongoose';
import { BikeDB } from './schemas/bike';
import { Bike, NewBike, UpdateBike, BIKE_STATUS } from '@bikers-community/models';

export class BikeDataStore {
  static async getBikeById(
    bikeId: Types.ObjectId
  ): Promise<Bike | null> {
    return await BikeDB.findOne({ _id: bikeId }).lean();
  }

  static async newBike(newBike: NewBike): Promise<Bike> {
    const bike: HydratedDocument<Bike> = new BikeDB({
      ...newBike,
      status: 'AVAILABLE',
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedByAdminId: newBike.createdByAdminId
    });
    await bike.save();
    return bike;
  }

  static async getBikeList(): Promise<Bike[]> {
    return await BikeDB.find().lean();
  }

  static async updateBikeStatus(bikeId: Types.ObjectId, newStatus: typeof BIKE_STATUS){
    return BikeDB.findOneAndUpdate({_id: bikeId}, {$set:{status: newStatus}}).lean();
  }

  static async updateBike(
    bikeId: Types.ObjectId,
    updateBike: UpdateBike
  ): Promise<Bike | null> {
    return await BikeDB.findOneAndUpdate(
      { _id: bikeId },
      { $set: {...updateBike, updatedAt: new Date()} },
      { new: true }
    ).lean();
  }
}
