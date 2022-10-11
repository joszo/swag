import { config } from '../commonData/envs';
import * as winston from 'winston';

enum LoggerLevel {
  info = 'info',
  debug = 'debug',
}

winston.addColors({
  info: 'bold green',
  debug: 'bold white',
  warn: 'bold yellow',
  error: 'bold red',
});

const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YY-MM-DD HH:MM:ss' }),
  winston.format.align(),
  winston.format.ms(),
  winston.format.printf(
    (info) =>
      ` ${info.timestamp} [${info.level}]:  ${info.message} [MS from previous log: ${info.ms}]`,
  ),
  winston.format.align(),
);

const isDebugLogs = config.debugLogs ? LoggerLevel.debug : LoggerLevel.info;

const logger = winston.createLogger({
  level: isDebugLogs,
  format: format,
  transports: [new winston.transports.Console()],
});
export const log = {
  /**
   * Visible only if LOG=true
   */
  debug: (content: unknown) => logger.debug(content),
  /**
   * Always visible
   */
  info: (content: unknown) => logger.info(content),
  /**
   * Always visible
   */
  warn: (content: unknown) => logger.warn(content),
  /**
   * Always visible
   */
  error: (content: unknown) => logger.error(content),
};
