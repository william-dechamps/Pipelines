import { AppSettings, Config } from "../config"
import getMongoDb from "../services/storage"


//this file initiate dependencies according to conf
export = async (conf: AppSettings) => {

  //Data PersistenceService
  let PersistenceService
  if (conf.mockDb) {
    PersistenceService = null
  } else {
    PersistenceService = await getMongoDb(Config.getMongoConf())
  }

  return {
    PersistenceService
  }
}
