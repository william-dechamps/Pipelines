import { StorageUserId, StorageUser, StorageUserEmail } from "../../models/users/StorageUser";
import { DuplicateError, NoResultError, ServerError } from "../Errors.common";
import UserRepository from "./interface";
import UserCollection from "../../models/users/MongoUser"
import mongoose, { mongo } from "mongoose";

export default class UserRepositoryMongo implements UserRepository {
  users: typeof UserCollection;
  constructor() {
    this.users = UserCollection;
  }

  async get(id: StorageUserId): Promise<StorageUser | undefined> {
    const mongoUser = await this.users.findOne({ _id: mongoose.Types.ObjectId(id) }, { __v: 0 }, { lean: true });
    if (!mongoUser) {
      return mongoUser;
    }

    const user: StorageUser = {
      id: String(mongoUser._id),
      email: mongoUser.email,
      password: mongoUser.password,
      state: mongoUser.state
    }

    return user;
  }

  async getByEmail(email: StorageUserEmail): Promise<StorageUser | undefined> {
    const mongoUser = await this.users.findOne({ email: email }, { _v: 0 }, { lean: true });
    if (!mongoUser) {
      return mongoUser;
    }
    return {
      id: String(mongoUser._id),
      email: mongoUser.email,
      password: mongoUser.password,
      state: mongoUser.state
    }
  }

  async add(user: StorageUser) {
    let mongoUser;
    try {
      mongoUser = await this.users.create(user);
    } catch (e: any) {
      if (e.message.match(/duplicate key/)) {
        throw new DuplicateError("user");
      } else {
        throw new ServerError(e.message);
      }
    }
    user.id = String(mongoUser._id);
    return user;
  }

  async update(user: StorageUser): Promise<StorageUser> {
    const mongoUser = {
      _id: mongoose.Types.ObjectId(user.id),
      email: user.email,
      state: user.state,
      password: user.password
    }

    const mongoUserUpdated = await this.users.findOneAndUpdate({ _id: mongoUser._id }, mongoUser, { new: true });

    if (!mongoUserUpdated) {
      throw new NoResultError("user");
    }

    return user;
  }

  async remove(id: StorageUserId) {
    let user;
    try {
      user = await this.users.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) });
    } catch (e: any) {
      throw new ServerError(e.message);
    }
    if (!user) {
      throw new NoResultError("user");
    }
  }
};
