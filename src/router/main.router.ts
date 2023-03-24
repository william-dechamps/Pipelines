import KoaRouter from "koa-router"
import getUserRouter from "./users.router"
import getPetRouter from "./pets.router"
import healthcheckRouter from "./HealthCheck"

export default function getMainRouter(dependencies: any): KoaRouter {
  const mainRouter = new KoaRouter()
  const userRouter = getUserRouter(dependencies.userRepo, dependencies.petRepo)
  const petRouter = getPetRouter(dependencies.petRepo)
  mainRouter.use("/", healthcheckRouter.routes())
  mainRouter.use("/", userRouter.routes())
  mainRouter.use("/", petRouter.routes())
  return mainRouter
}