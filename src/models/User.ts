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

  /**
   * @returns string `firstname lastname`
   */
  getFullname(): string {
    throw new Error("Not implemented")
  }

  /**
   * Add a Pet in the user's Pets list
   * @param pet Pet to add to the list
   */
  addPet(pet: Pet) {
    throw new Error("Not implemented")
  }

  /**
   * 
   * @returns a JSON representation of the current User
   * @example
   * ```json
   * {
   *    firstname: "Nicolas",
   *    lastname: "Espiau",
   *    pets: [
   *      {
   *        vetId: 100322,
   *        name: "Pastèque",
   *        kind: "dog",
   *        age: "2"
   *      }
   *    ]
   * }
   * ```
   */
  toJSON(): object {
    throw new Error("Not implemented")
  }
}