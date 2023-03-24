import { AppSettings } from "../config"
import UserRepository from "../repositories/users/interface"
import UserRepositoryMock from "../repositories/users/mock"
import UserRepositoryMongo from "../repositories/users/mongo"

export default (dependencies: any, conf: AppSettings) => {
  let userRepo: UserRepository
  if (conf.mockDb) {
    userRepo = new UserRepositoryMock()
  }
  else {
    userRepo = new UserRepositoryMongo(dependencies.PersistenceService)
  }

  return {
    userRepo
  }
}