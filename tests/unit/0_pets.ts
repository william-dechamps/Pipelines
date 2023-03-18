import Pet from "../../src/models/Pet"

describe("Testing Pet class", () => {
  describe("Normal creation", () => {
    let cat: Pet
    beforeAll(() => {
      cat = new Pet('Donkey', 'cat', 10)
    })
    test("should create a cat", () => {
      expect(cat).toBeInstanceOf(Pet)
    })
  })
  describe("Creation with missing params", () => {
    test("should raise an MissingDataError error", () => {
      expect(
        () => {
          const pet = new Pet("Donkey")
        }
      ).toThrowError()
    })
  })
  describe("JSON representation", () => {
    let pet: Pet
    let json: object
    beforeAll(() => {
      pet = new Pet("Pastèque", "dog", 2)
      json = pet.toJSON()
    })
    test("Generate JSON", () => {
      expect(json).toBeInstanceOf(Object)
    })
  })
})