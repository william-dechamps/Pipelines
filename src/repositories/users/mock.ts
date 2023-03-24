import User from "../../models/User"
import { DuplicateError, NoResultError } from "../../helpers/RepositoryErrors"
import UserRepository from "./interface"

export = class UserRepositoryMock implements UserRepository {
  users: { [key: string]: User }
  nextId: number = 0
  constructor() {
    this.users = {}
  }

  async get(id: Number | String): Promise<User | null> {
    return this.users[String(id)] || null
  }

  async add(user: User) {
    const existingUsers = Object.values(this.users).filter(storedUser => storedUser.firstname == user.firstname && storedUser.lastname == user.lastname)
    if (existingUsers.length != 0) {
      throw new DuplicateError("User", `${user.firstname} ${user.lastname}`)
    }

    const id = String(this.nextId)
    user.id = id
    this.users[id] = user
    let returnUser: User = Object.assign({}, user)
    returnUser.id = id
    this.nextId++

    return returnUser
  }

  async update(user: User): Promise<User> {
    if (!this.users[String(user.id)]) {
      throw new NoResultError("User", user.id)
    }

    this.users[parseInt(user.id)] = user
    return Object.assign({}, user)
  }

  async remove(id: string) {
    if (!this.users[String(id)]) {
      throw new NoResultError("User", id)
    }

    delete this.users[String(id)]
  }
}