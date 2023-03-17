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
    test("WRITE ME", () => {
      expect(true).toBe(true)
    })
  })
})