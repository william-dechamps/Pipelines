import Pet from "../../src/models/Pet"
import User from "../../src/models/User"

describe("Testing User class", () => {
  describe("Normal creation", () => {
    let user: User
    beforeAll(() => {
      user = new User('John', 'Hammond')
    })
    test("should create a user", () => {
      expect(user).toBeInstanceOf(User)
    })
  })
  describe("Creation with missing params", () => {
    test("should raise an MissingDataError error", () => {
      expect(
        () => {
          const user = new User("John")
        }
      ).toThrowError()
    })
  })
  describe("Add/Get Pet", () => {
    let user: User
    let pasteque: Pet
    beforeAll(() => {
      user = new User('John', 'Hammond')
      pasteque = new Pet("Pastèque", "dog", 2.5)
    })
    describe("Add Pet", () => {
      beforeAll(() => {
        user.addPet(pasteque)
      })
      test("should add a pet", () => {
        expect(user.pets).toHaveLength(1)
      })
    })
    describe("Get Pet", () => {
      let pet: Pet
      beforeAll(() => {
        pet = user.getPet("Pastèque", "dog") as Pet
      })
      test("should return a pet", () => {
        expect(pet).toBeInstanceOf(Pet)
      })
      test("should return Pastèque", () => {
        expect(pet).toBe(pasteque)
      })
    })
  })
  describe("JSON representation", () => {
    test("WRITE ME", () => {
      expect(true).toBe(true)
    })
  })
})