import Pet from "../../src/models/Pet";

describe("Testing Pet class", () => {
  describe("Pet creation and show description", () => {
    let description: string;
    let cat: Pet;
    beforeAll(() => {
      cat = new Pet(1, "Donkey", "cat", new Date("1990-07-22T00:00:00Z"));
      description = cat.describe();
    });
    test("should create a cat", () => {
      expect(cat).toBeInstanceOf(Pet);
    });
    test("should return the correct description", () => {
      expect(description).toEqual("Donkey (1): cat, 32");
    });
  });

  describe("Get age", () => {
    it("should return the correct age when birth date is before current date in same year", () => {
      const pet = new Pet(
        2,
        "Pastèque",
        "dog",
        new Date("1995-02-07T00:00:00Z")
      );
      expect(pet.getAge()).toEqual(28);
    });
    it("should return the correct age when birth date is after current date in same year", () => {
      const pet = new Pet(
        2,
        "Pastèque",
        "dog",
        new Date("1995-12-31T00:00:00Z")
      );
      expect(pet.getAge()).toEqual(27);
    });
    it("should return the correct age when birth date is in a previous year", () => {
      const pet = new Pet(
        2,
        "Pastèque",
        "dog",
        new Date("1990-07-22T00:00:00Z")
      );
      expect(pet.getAge()).toEqual(32);
    });
  });

  describe("JSON representation", () => {
    let pet: Pet;
    let json: object;
    beforeAll(() => {
      pet = new Pet(2, "Pastèque", "dog", new Date("2020-08-07T00:00:00Z"));
      json = pet.toJSON();
    });
    test("Generate JSON", () => {
      expect(json).toEqual({
        vetId: pet.vetId,
        name: pet.name,
        kind: pet.kind,
        age: pet.getAge(),
      });
    });
  });
});
