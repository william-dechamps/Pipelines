import KoaRouter from "koa-router"
import getController from "../controllers/users.ctrl"
import PetRepository from "../repositories/pets/interface"
import UserRepository from "../repositories/users/interface"

export default function getRouter(userRepo: UserRepository, petRepo: PetRepository) {
  const router = new KoaRouter({ "prefix": "users" })
  const controller = getController(userRepo, petRepo)

  router
    .get('/',
      controller.listUsers
    )
    .post('/',
      controller.addUser
    )
    .get('/:id',
      controller.getUser
    )
    .put('/',
      controller.updateUser
    )
    .delete('/:id',
      controller.deleteUser
    )

  return router

}