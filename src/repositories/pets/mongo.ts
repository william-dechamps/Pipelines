import Pet from "../../models/Pet"
import { DuplicateError, NoResultError, ServerError } from "../../helpers/RepositoryErrors"
import PetRepository from "./interface"
import { Collection, Db, ObjectId } from "mongodb"
import logger from "../../services/logger"

export default class PetRepositoryMongo implements PetRepository {
  pets: Collection<Pet>
  constructor(mongoDb: Db) {
    this.pets = mongoDb.collection<Pet>("pets")
    this.pets.createIndex({ vetId: 1 }, { unique: true })
  }

  async get(id: string): Promise<Pet | null> {
    const mongoPet = await this.pets.findOne({ _id: new ObjectId(id) })
    if (!mongoPet) {
      return mongoPet
    }

    return mongoPet
  }

  async list(ids: string[]): Promise<Pet[]> {
    return await this.pets.find({ _id: { $in: ids.map(id => new ObjectId(id)) } }).toArray()
  }

  async add(pet: Pet) {
    let result
    try {
      result = await this.pets.insertOne(pet)
    } catch (e: any) {
      if (e.message.match(/duplicate key/)) {
        throw new DuplicateError("Pet", String(pet.vetId))
      } else {
        throw new ServerError(e.message)
      }
    }

    pet.id = result.insertedId.toString("hex")
    // @ts-ignore
    delete pet._id

    return pet
  }

  async update(pet: Pet): Promise<Pet> {
    const mongoPetUpdated = await this.pets.findOneAndReplace({ vetId: pet.vetId }, pet, { returnDocument: "after" })

    if (!mongoPetUpdated) {
      throw new NoResultError("Pet", pet.id)
    }

    // @ts-ignore
    delete pet._id

    return pet
  }

  async remove(id: string) {
    let result
    try {
      result = await this.pets.deleteOne({ _id: new ObjectId(id) })
    } catch (e: any) {
      throw new ServerError(e.message)
    }
    if (result.deletedCount === 0) {
      throw new NoResultError("Pet", id)
    }
  }
}
