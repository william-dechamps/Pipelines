import { MissingDataError } from "../helpers/Errors"
import JSONable from "./JSONable"

export default class Pet implements JSONable {
  name: string
  kind: string
  age: number
  constructor(name: string, kind?: string, age?: number) {
    if (arguments.length < 3) {
      throw new MissingDataError()
    }
    this.name = name
    this.kind = kind || ""
    this.age = age || 0
  }

  describe(): string {
    return `${this.name}, ${this.kind}, ${this.age} years`
  }

  toJSON() {
    return {
      name: this.name,
      kind: this.kind,
      age: this.age
    }
  }
}