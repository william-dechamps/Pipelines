import Pet from "../../src/models/Pet";
import User from "../../src/models/User";

describe("Testing User class", () => {
  describe("User creation and show full name", () => {
    let user: User;
    beforeAll(() => {
      user = new User("John", "Hammond");
    });
    test("should create a user", () => {
      expect(user).toBeInstanceOf(User);
    });
    test("should return the correct full name", () => {
      const fullname = user.getFullname();
      expect(fullname).toEqual("John Hammond");
    });
  });

  describe("Add Pet", () => {
    let user: User;
    let pet: Pet;
    beforeAll(() => {
      user = new User("John", "Hammond");
      pet = new Pet(2, "Pastèque", "dog", new Date("2020-08-07T00:00:00Z"));
    });
    describe("Add Pet", () => {
      beforeAll(() => {
        user.addPet(pet);
      });
      test("should add a pet", () => {
        expect(user.pets).toHaveLength(1);
        expect(user.pets).toContain("2");
      });
    });
  });

  describe("JSON representation", () => {
    let user: User;
    let json: object;
    let pet: Pet;
    beforeAll(() => {
      user = new User("Jone", "Doe");
      user.addPet(
        new Pet(2, "Pastèque", "dog", new Date("1995-02-07T00:00:00Z"))
      );
      json = user.toJSON();
    });
    test("Generate JSON", () => {
      expect(json).toEqual({
        firstname: user.firstname,
        lastname: user.lastname,
        pets: user.pets,
      });
    });
  });
});
