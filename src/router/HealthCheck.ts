import KoaRouter from "koa-router"

const healthcheckRouter = new KoaRouter({ "prefix": "healthcheck" })

healthcheckRouter
  .get('/',
    (c, n) => {
      c.status = 200
      c.body = { status: "ok" }
      n()
    }
  )

export default healthcheckRouter