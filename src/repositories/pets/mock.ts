import Pet from "../../models/Pet"
import { DuplicateError, NoResultError } from "../../helpers/RepositoryErrors"
import PetRepository from "./interface"

export default class PetRepositoryMock implements PetRepository {
  pets: { [key: string]: Pet }
  nextId: number = 0
  constructor() {
    this.pets = {}
  }

  async get(id: string): Promise<Pet | null> {
    return this.pets[String(id)] || null
  }

  async list(ids: string[]): Promise<Pet[]> {
    return Object.values(this.pets).filter(pet => ids.indexOf(pet.id) >= 0)
  }

  async add(pet: Pet) {
    const existingPets = Object.values(this.pets).filter(storedPet => storedPet.vetId === pet.vetId)
    if (existingPets.length != 0) {
      throw new DuplicateError("Pet", String(pet.vetId))
    }

    const id = String(this.nextId)
    pet.id = id
    this.pets[id] = pet
    let returnPet: Pet = Object.assign({}, pet)
    returnPet.id = id
    this.nextId++

    return returnPet
  }

  async update(pet: Pet): Promise<Pet> {
    if (!this.pets[parseInt(pet.id)]) {
      throw new NoResultError("Pet", pet.id)
    }

    this.pets[parseInt(pet.id)] = pet
    return Object.assign({}, pet)
  }

  async remove(id: string) {
    if (!this.pets[parseInt(id)]) {
      throw new NoResultError("Pet", id)
    }

    delete this.pets[parseInt(id)]
  }
}