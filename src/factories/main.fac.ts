import ServicesFactory from "./services.fac"
import RepositoriesFactory from "./repositories.fac"
import { AppSettings } from "../config"

//init dependencies:
// - persistence service
// - cache service
// - repositories

//this file initiate dependencies according to conf
export default async (conf: AppSettings) => {
  const Services = await ServicesFactory(conf)
  const Repositories = RepositoriesFactory(Services, conf)

  return {
    ...Services,
    ...Repositories
  }
}
