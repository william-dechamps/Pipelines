import JSONable from "./JSONable"

export default class Pet implements JSONable {
  id?: any
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
    const today = new Date()
    const age = today.getFullYear() - this.birthDate.getFullYear()
    if (today.getMonth() === this.birthDate.getMonth()) {
      return age - (today.getDate() > this.birthDate.getDate() ? 0 : 1)
    }
    return age - (today.getMonth() > this.birthDate.getMonth() ? 0 : 1)
  }

  /**
   * @returns string `name (vetId): kind, age`
   * @example "Pastèque (123456): dog, 2"
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
    return {
      vetId: this.vetId,
      name: this.name,
      kind: this.kind,
      age: this.getAge()
    }
  }
}