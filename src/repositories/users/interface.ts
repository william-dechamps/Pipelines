import User from "../../models/User"

export default interface UserRepository {
  get(id: any): Promise<User | null>
  add(user: User): Promise<User>
  update(user: User): Promise<User>
  remove(id: any): Promise<void>
}