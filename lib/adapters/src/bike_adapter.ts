import { Bike, ObjectId } from "@bikers-community/models";

export class BikeAdapter {
  static async getBike(bikeId: ObjectId): Promise<Bike|null> {
    // comunicacion con el broker

    return {};
  }
  static async updateBikeStatus(bikeId: ObjectId, newStatus: string): Promise<boolean|null> {
    // comunicacion con el broker
    return true;
  }
}
