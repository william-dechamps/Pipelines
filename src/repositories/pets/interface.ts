import {StorageUser, StorageUserEmail, StorageUserId} from "../../models/users/StorageUser";

export default interface UserRepository {
  get(id:StorageUserId): Promise<StorageUser | undefined>;
  getByEmail(email:StorageUserEmail): Promise<StorageUser | undefined>
  add(user: StorageUser): Promise<StorageUser>;
  update(user: StorageUser): Promise<StorageUser>;
  remove(id: StorageUserId): Promise<void>;
}