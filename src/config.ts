import nconf from "nconf"

nconf.env().argv()
nconf.file(nconf.any(["CONFIG_FILE", "config"]) || "./config/app.conf.json")

type AppSettings = {
    port?: number,
    mockDb?: boolean
}

type LogSettings = {
    level?: string,
    format?: string,
    transports?: string
}

type MongoConf = {
    db: string,
    host: string,
    port: number,
    user: string,
    password: string,
    replicaSet: string,
    authSource: string | boolean
}

const Config = {
    getAppSettings(): AppSettings {
        return {
            "port": nconf.get("PORT") || 80,
            "mockDb": nconf.get("MOCK_DB") === "true"
        }
    },
    getLogSettings(): LogSettings {
        return {
            "level": nconf.get("LOG_LEVEL") || "error",
            "format": nconf.get("LOG_FORMAT") || "splat,simple",
            "transports": nconf.get("LOG_TRANSPORTS") || "console"
        }
    },
    getMongoConf(): MongoConf {
        return {
            "db": nconf.get("MONGO_DB"),
            "host": nconf.get("MONGO_HOST"),
            "port": nconf.get("MONGO_PORT"),
            "user": nconf.get("MONGO_USER"),
            "password": nconf.get("MONGO_PASSWD"),
            "replicaSet": nconf.get("MONGO_REPLSET"),
            "authSource": nconf.get("MONGO_AUTHSOURCE") || false
        }
    }
}

export { Config, AppSettings, LogSettings, MongoConf }