import { Next, ParameterizedContext } from "koa"
import { InternalError, InvalidPayload, ResourceAlreadyExistingError, ResourceNotFoundError } from "../helpers/ControllerErrors"
import Pet from "../models/Pet"
import PetRepository from "../repositories/pets/interface"

export default function getController(petRepo: PetRepository) {

  async function addPet(ctx: ParameterizedContext, next: Next) {
    // Validate payload
    // > if no valid throw new InvalidPayload
    // Store user in DB
    const payload: any = ctx.request.body
    const expectedKeys = ["vetId", "name", "kind", "birthDate"]
    const missingKeys = expectedKeys.filter(k => !Object.keys(payload).includes(k))

    if (missingKeys.length > 0) {
      throw new InvalidPayload(missingKeys, [])
    }

    try {
      const pet = await petRepo.add(new Pet(payload.vetId, payload.name, payload.kind, new Date(payload.birthDate)))
      ctx.status = 201
      ctx.body = pet
    } catch (e: any) {
      if (e.message.match(/already exists in storage/)) {
        throw new ResourceAlreadyExistingError(`Pet with vetId ${payload.vetId} already exists`)
      }
      throw new InternalError(e.message)
    }
    next()
  }

  async function listPets(ctx: ParameterizedContext, next: Next) {
    ctx.status = 404
    ctx.body = { message: "Not yet implemented" }

    next()
  }

  async function getPet(ctx: ParameterizedContext, next: Next) {
    const pet = await petRepo.get(ctx.params.id)

    if (!pet) {
      throw new ResourceNotFoundError("User not found")
    }

    ctx.status = 200
    ctx.body = pet.toJSON()
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