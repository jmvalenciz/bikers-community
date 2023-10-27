import { HydratedDocument, Types } from 'mongoose';
import { UserDB } from './schemas/user';
import { User, NewUser } from '@bikers-community/models';

export class UserDataStore {
  static async getUserById(
    userId: Types.ObjectId
  ): Promise<User | null> {
    return await UserDB.findOne({ userId }).lean();
  }
 
  static async newUser(newUser: NewUser): Promise<User> {
    
    const user: HydratedDocument<User> = new UserDB(newUser); 
    await user.save();
    return user;
  }

  static async deleteUserById(
    userId: Types.ObjectId
  ): Promise<User | null> {
    return await UserDB.findOneAndDelete({ userId }).lean();
  }

  static async getUserListByUserId(
    userId: Types.ObjectId
  ): Promise<User[]> {
    return await UserDB.find({ userId }).lean();
  }


}
