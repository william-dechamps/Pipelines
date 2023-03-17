import { MissingDataError } from "../helpers/Errors"
import JSONable from "./JSONable"
import Pet from "./Pet"

export default class User implements JSONable {
  firstname: string
  lastname: string
  pets: Pet[]
  constructor(firstname: string, lastname?: string) {
    if (!firstname || !lastname) {
      throw new MissingDataError()
    }
    this.firstname = firstname
    this.lastname = lastname
    this.pets = []
  }

  getFullname() {
    return `${this.firstname} ${this.lastname}`
  }

  addPet(pet: Pet) {
    let existing = this.getPet(pet.name, pet.kind)
    if (existing) {
      existing = pet
      return pet
    }
    this.pets.push(pet)
    return pet
  }

  getPet(name: string, kind: string): Pet | null {
    return this.pets.find(p => p.name === name && p.kind === kind) || null
  }

  toJSON(): object {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      pets: this.pets.map(p => p.describe())
    }
  }
}