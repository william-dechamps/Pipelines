import { Db, MongoClient, ServerApiVersion } from "mongodb"
import { Config } from "../config"

const mongoConf = Config.getMongoConf()

const uri = `mongodb://${mongoConf.user}:${mongoConf.password}@${mongoConf.host}:${mongoConf.port}/${mongoConf.password}?authSource=${mongoConf.authSource}`

let client: MongoClient
export default async function getMongoDb(): Promise<Db> {
  if (client) {
    return client.db(mongoConf.db)
  }

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
  )

  await client.connect()
  return client.db(mongoConf.db)
}