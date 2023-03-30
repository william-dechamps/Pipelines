import { Db, MongoClient, ServerApiVersion } from "mongodb"
import { MongoConf } from "../config"



let client: MongoClient
export default async function getMongoDb(mongoConf: MongoConf): Promise<[Db, MongoClient]> {
  if (!client) {
    const uri = `mongodb://${mongoConf.host}:${mongoConf.port}?authSource=${mongoConf.authSource}`
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    client = new MongoClient(uri, {
      auth: {
        username: mongoConf.user,
        password: mongoConf.password
      },
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })

    await client.connect()
  }
  return [client.db(mongoConf.db), client]
}