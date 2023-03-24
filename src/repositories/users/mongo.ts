import User from "../../models/User"
import { DuplicateError, NoResultError, ServerError } from "../../helpers/RepositoryErrors"
import UserRepository from "./interface"
import { Collection, Db, ObjectId } from "mongodb"

export default class UserRepositoryMongo implements UserRepository {
  users: Collection<User>
  constructor(mongoDb: Db) {
    this.users = mongoDb.collection<User>("users")
    this.users.createIndex({ firstname: 1, lastname: 1 }, { unique: true })
  }

  async get(id: string): Promise<User | null> {
    const mongoUser = await this.users.findOne({ _id: new ObjectId(id) })
    if (!mongoUser) {
      return mongoUser
    }

    const user: User = new User(mongoUser.firstname, mongoUser.lastname)
    user.pets = mongoUser.pets
    user.id = mongoUser._id.toString()

    return user
  }

  async add(user: User) {
    let result
    try {
      result = await this.users.insertOne(user)
    } catch (e: any) {
      if (e.message.match(/duplicate key/)) {
        throw new DuplicateError("User", `${user.firstname}/${user.lastname}`)
      } else {
        throw new ServerError(e.message)
      }
    }
    user.id = result.insertedId.toString()
    return user
  }

  async update(user: User): Promise<User> {
    const mongoUserUpdated = await this.users.findOneAndUpdate({ _id: new ObjectId(user.id) }, user, { returnDocument: 'after' })

    if (!mongoUserUpdated) {
      throw new NoResultError("User", user.id)
    }

    return user
  }

  async remove(id: string) {
    let result
    try {
      result = await this.users.deleteOne({ _id: new ObjectId(id) })
    } catch (e: any) {
      throw new ServerError(e.message)
    }
    if (result.deletedCount === 0) {
      throw new NoResultError("User", id)
    }
  }
}
