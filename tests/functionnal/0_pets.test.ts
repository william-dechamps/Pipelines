import request from "supertest"

const apiUrl = `${process.env.API_HOST || "localhost"}:${process.env.API_PORT || 6800}`

describe("Functionnal testing for Pets", () => {
  let inserted: any
  describe("Adding a pet", () => {
    describe("Ivalid payload", () => {
      let response: any
      test("Is should return an error", async () => {
        response = await request(apiUrl)
          .post('/pets')
          .send({ kind: "dog" })
          .expect(400)
      })
      test("It should specify that keys are missing", () => {
        expect(response.text).toMatch(/Missing keys/)
      })
    })
  })
})