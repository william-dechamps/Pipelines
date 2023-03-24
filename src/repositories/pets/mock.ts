import { StorageUserId,StorageUser, StorageUserEmail } from "../../models/users/StorageUser";
import { DuplicateError, NoResultError } from "../Errors.common";
import UserRepository from "./interface"

export = class UserRepositoryMock implements UserRepository {
  users: { [key: string]: StorageUser };
  nextId:number = 0;
  constructor() {
    this.users = {};
  }

  async get(id: StorageUserId): Promise<StorageUser | undefined> {
    return this.users[String(id)];
  }

  async getByEmail(email:StorageUserEmail): Promise<StorageUser | undefined> {
    // get all users with this email (only one should be found or none if non existing user)
    const user = Object.values(this.users).filter(storedUser => storedUser.email === email);
    // return the user or undefined if no user found
    return user.pop();
  }

  async add(user: StorageUser) {
    const existingUsers = Object.values(this.users).filter(storedUser => { return storedUser.email == user.email});
    if (existingUsers.length != 0) {
      throw new DuplicateError("user");
    }

    const id = String(this.nextId);
    user.id = id;
    this.users[id] = user;
    let returnUser:StorageUser = Object.assign({}, user);
    returnUser.id = id;
    this.nextId++;

    return returnUser;
  }

  async update(user: StorageUser): Promise<StorageUser> {
    if(!this.users[parseInt(user.id)]) {
      throw new NoResultError("user");
    }

    this.users[parseInt(user.id)] = user;
    return Object.assign({}, user);
  }

  async remove(id: StorageUserId) {
    if(!this.users[parseInt(id)]) {
      throw new NoResultError("user");
    }

    delete this.users[parseInt(id)];
  }
};