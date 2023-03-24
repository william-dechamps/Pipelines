import { Next, ParameterizedContext } from "koa"
import { InternalError, InvalidPayload, ResourceNotFoundError } from "../helpers/ControllerErrors"
import PetRepository from "../repositories/pets/interface"

export default function getController(petRepo: PetRepository) {

  async function addPet(ctx: ParameterizedContext, next: Next) {
    // Validate payload
    // > if no valid throw new InvalidPayload
    // Store user in DB
    // 
    ctx.status = 404
    ctx.body = { message: "Not yet implemented" }

    next()
  }

  async function listPets(ctx: ParameterizedContext, next: Next) {
    ctx.status = 404
    ctx.body = { message: "Not yet implemented" }

    next()
  }

  async function getPet(ctx: ParameterizedContext, next: Next) {
    try {
      const pet = await petRepo.get(ctx.params.id)

      if (!pet) {
        throw new ResourceNotFoundError("User not found")
      }

      ctx.status = 200
      ctx.body = pet.toJSON()
    } catch (e: any) {
      throw new InternalError(e.message)
    }
    next()
  }

  async function updatePet(ctx: ParameterizedContext, next: Next) {
    ctx.status = 404
    ctx.body = { message: "Not yet implemented" }

    next()
  }

  async function deletePet(ctx: ParameterizedContext, next: Next) {
    ctx.status = 404
    ctx.body = { message: "Not yet implemented" }

    next()
  }

  return {
    addPet,
    listPets,
    getPet,
    updatePet,
    deletePet
  }
}