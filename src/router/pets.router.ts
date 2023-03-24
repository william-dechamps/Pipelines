import KoaRouter from "koa-router"
import getController from "../controllers/pets.ctrl"
import PetRepository from "../repositories/pets/interface"

export default function getRouter(petRepo: PetRepository) {
  const router = new KoaRouter({ "prefix": "users" })
  const controller = getController(petRepo)

  router
    .get('/',
      controller.listPets
    )
    .post('/',
      controller.addPet
    )
    .get('/:id',
      controller.getPet
    )
    .put('/',
      controller.updatePet
    )
    .delete('/:id',
      controller.deletePet
    )

  return router

}