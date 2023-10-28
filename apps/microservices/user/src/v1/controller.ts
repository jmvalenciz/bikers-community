import { Types } from 'mongoose';
import { UserDataStore } from './db/datastore';
import { NewUser, User } from '@bikers-community/models';


export class UserController { 
  static async newUser(
    newUser: NewUser
  ): Promise<User> {
    const user = await UserDataStore.newUser(newUser);
    return user;
  } 
  static async getUser(userId: Types.ObjectId): Promise<User | null> {
    return await UserDataStore.getUserById(userId);
  }
}
