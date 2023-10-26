import { HydratedDocument, Types } from "mongoose";
import { BikeDB } from "./schemas/bike";
import { Bike, NewBike } from "@bikers-community/models";

export class BikeDataStore{
  static async getBike(bookingId: Types.ObjectId): Promise<Bike|null>{
    return await BikeDB.findOne({bookingId}).lean();
  }

  static async newBike(newBike: NewBike): Promise<Bike>{
    const booking: HydratedDocument<Bike> = new BikeDB(newBike);
    await booking.save();
    return booking;
  }

  static async deleteBikeById(bookingId: Types.ObjectId): Promise<Bike|null>{
    return await BikeDB.findOneAndDelete({bookingId}).lean();
  }

  static async getBikeList(bikeIdList: Types.ObjectId[]): Promise<Bike[]>{
    return await BikeDB.find({bikeId: {$in:[bikeIdList]}}).lean();
  }
}
