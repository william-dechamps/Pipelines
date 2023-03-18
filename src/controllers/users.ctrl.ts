import { Next, ParameterizedContext } from "koa"
import Pet from "../models/Pet"
import User from "../models/User"
import { InvalidPayload } from "../helpers/Errors"

export function addUser(ctx: ParameterizedContext, next: Next) {
  // Validate payload
  // > if no valid throw new InvalidPayload
  ctx.status = 404
  ctx.body = { message: "Not yet implemented" }

  next()
}

export function listUsers(ctx: ParameterizedContext, next: Next) {
  ctx.status = 404
  ctx.body = { message: "Not yet implemented" }

  next()
}

export function getUser(ctx: ParameterizedContext, next: Next) {
  ctx.status = 404
  ctx.body = { message: "Not yet implemented" }

  next()
}

export function updateUser(ctx: ParameterizedContext, next: Next) {
  ctx.status = 404
  ctx.body = { message: "Not yet implemented" }

  next()
}

export function deleteUser(ctx: ParameterizedContext, next: Next) {
  ctx.status = 404
  ctx.body = { message: "Not yet implemented" }

  next()
}