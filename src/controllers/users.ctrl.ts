import { Next, ParameterizedContext } from "koa"
import { InternalError, InvalidPayload, ResourceNotFoundError } from "../helpers/ControllerErrors"
import UserRepository from "../repositories/users/interface"

export default function getController(userRepo: UserRepository) {

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
    try {
      const user = await userRepo.get(ctx.params.id)

      if (!user) {
        throw new ResourceNotFoundError("User not found")
      }

      ctx.status = 200
      ctx.body = user.toJSON()
    } catch (e: any) {
      throw new InternalError(e.message)
    }
    next()
  }

  async function updateUser(ctx: ParameterizedContext, next: Next) {
    ctx.status = 404
    ctx.body = { message: "Not yet implemented" }

    next()
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