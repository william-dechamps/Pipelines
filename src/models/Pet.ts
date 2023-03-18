import JSONable from "./JSONable"

export default class Pet implements JSONable {
  vetId: Number
  name: string
  kind: string
  birthDate: Date
  constructor(vetId: Number, name: string, kind: string, birthDate: Date) {
    this.vetId = vetId
    this.name = name
    this.kind = kind || ""
    this.birthDate = birthDate
  }

  /**
   * @returns Number the current pet's age calculated from its birthDate
   */
  getAge(): number {
    throw new Error("Not implemented")
  }

  /**
   * @returns string `name, kind, age, vetId`
   */
  describe(): string {
    throw new Error("Not implemented")
  }

  /**
   * 
   * @returns a JSON representation of the current Pet
   * @example
   * ```json
   * {
   *    name: "Pastèque",
   *    kind: "dog",
   *    age: 2
   * }
   * ```
   */toJSON(): Object {
    throw new Error("Not implemented")
  }
}