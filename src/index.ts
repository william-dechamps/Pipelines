import { Config } from "./config"
import koa from "koa"
import bodyparser from "koa-bodyparser"
import mainFac from "./factories/main.fac"
import getMainRouter from "./router/main.router"
import logger from "./services/logger"
import { HttpError, InternalError } from "./helpers/ControllerErrors"

const appSettings = Config.getAppSettings()
let server: any

mainFac(appSettings)
  .then(dependencies => {
    logger.info(appSettings)

    const app = new koa()

    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (err: any) {
        if (err! instanceof HttpError) {
          err = new InternalError(`Internal error with message \`${err.message}\``)
        }

        ctx.status = err.httpStatus
        ctx.body = {
          status: err.httpStatus,
          error: err.message
        }
      }
    })

    app.use(bodyparser({ jsonLimit: "1kb" }))

    //load routes
    const Router = getMainRouter(dependencies)
    app
      .use(Router.routes())
      .use(Router.allowedMethods())


    /** SERVER CREATION **/
    server = app.listen(appSettings.port)

    server.on('listening', async () => {
      const hostname = require("os").hostname()
      console.log("Server running on", hostname, "port", appSettings.port)
    })

    server.on("close", async () => {
      console.log("Closing server")
    })
  })



export default server