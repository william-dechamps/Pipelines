import { AppSettings } from "../config"
import PetRepository from "../repositories/pets/interface"
import PetRepositoryMock from "../repositories/pets/mock"
import PetRepositoryMongo from "../repositories/pets/mongo"
import UserRepository from "../repositories/users/interface"
import UserRepositoryMock from "../repositories/users/mock"
import UserRepositoryMongo from "../repositories/users/mongo"

export default (dependencies: any, conf: AppSettings) => {
  let userRepo: UserRepository
  let petRepo: PetRepository
  if (conf.mockDb) {
    userRepo = new UserRepositoryMock()
    petRepo = new PetRepositoryMock()
  }
  else {
    userRepo = new UserRepositoryMongo(dependencies.PersistenceService)
    petRepo = new PetRepositoryMongo(dependencies.PersistenceService)
  }

  return {
    petRepo,
    userRepo
  }
}