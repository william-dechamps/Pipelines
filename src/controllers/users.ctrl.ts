import { Next, ParameterizedContext } from "koa"
import { InternalError, InvalidPayload, ResourceNotFoundError } from "../helpers/ControllerErrors"
import PetRepository from "../repositories/pets/interface"
import UserRepository from "../repositories/users/interface"

export default function getController(userRepo: UserRepository, petRepo: PetRepository) {

  async function addUser(ctx: ParameterizedContext, next: Next) {
    // Validate payload
    // > if no valid throw new InvalidPayload
    // Store user in DB
    // 
    ctx.status = 404
    ctx.body = { message: "Not yet implemented" }

    next()
  }

  async function listUsers(ctx: ParameterizedContext, next: Next) {
    ctx.status = 404
    ctx.body = { message: "Not yet implemented" }

    next()
  }

  async function getUser(ctx: ParameterizedContext, next: Next) {
    const user = await userRepo.get(ctx.params.id)

    if (!user) {
      throw new ResourceNotFoundError("User not found")
    }

    const pets = await petRepo.list(user.pets)

    const displayableUser = { ...user.toJSON(), pets: pets }

    ctx.status = 200
    ctx.body = displayableUser
    next()
  }

  async function updateUser(ctx: ParameterizedContext, next: Next) {
    ctx.status = 404
    ctx.body = { message: "Not yet implemented" }

    next()
  }

  async function addPet(ctx: ParameterizedContext, next: Next) {
    // users/:id/pets
    // POST
    // body: PetId[]
  }

  async function deleteUser(ctx: ParameterizedContext, next: Next) {
    ctx.status = 404
    ctx.body = { message: "Not yet implemented" }

    next()
  }

  return {
    addUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser
  }
}