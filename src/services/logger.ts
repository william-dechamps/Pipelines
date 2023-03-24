import winston, { createLogger, format, transports } from "winston"
import { Config } from "../config"
const { combine, timestamp, prettyPrint } = format

const logger = createLogger({
  level: Config.getLogSettings().level,
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger