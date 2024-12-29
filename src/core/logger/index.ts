import { type Logger, createLogger, format, transports } from 'winston';

const WinstonLogLevel = {
  INFO: 'info',
  ERROR: 'error',
  WARN: 'warn',
  HTTP: 'http',
  VERBOSE: 'verbose',
  DEBUG: 'debug',
  SILLY: 'silly'
};

export default class AppLogger {
  logger: Logger;

  constructor() {
    const { combine, timestamp, label, printf } = format;

    const customLoggerFormat = printf(({ level, message, timestamp }) => {
      let logMessage = message;
      let statusCode = '200';

      // Handle error scenario
      if (level === WinstonLogLevel.ERROR) {

        logMessage = message;
        statusCode = '400'; // Default to '400' for string errors

        // Make the error log message red
        logMessage = `\x1b[31m${logMessage}\x1b[0m`; // Red for error messages
      }
      // Handle success scenario (non-error logs)
      else {
        statusCode = '200'; // Default success status code
        logMessage = `\x1b[32m${logMessage}\x1b[0m`; // Red for error messages
      }

      // Define color rules based on log level or message content
      const coloredAppLogger = `\x1b[33m[AppLogger]\x1b[0m`; // Yellow for the AppLogger text
      const timestampLogger = `\x1b[32m[${timestamp}]\x1b[0m`;
      let statusCodeLogger = `\x1b[32m(statusCode: ${statusCode})\x1b[0m`;

      if(statusCode !== '200'){
        statusCodeLogger = `\x1b[31m(statusCode: ${statusCode})\x1b[0m`;
      }

      // Return formatted log string
      return `${timestampLogger} - ${coloredAppLogger} ${level}: ${logMessage} ${statusCodeLogger}`;
    });

    this.logger = createLogger({
      format: combine(
        label({ label: 'AppLog' }),
        timestamp(),
        customLoggerFormat
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: 'AppLogger.log'
        })
      ]
    });
  }

  log(message: string | object): void {
    this.logger.log(WinstonLogLevel.INFO, message);
  }

  error(message: string | object | unknown): void {
    this.logger.log(WinstonLogLevel.ERROR, message);
  }

  warn(message: string | object): void {
    this.logger.log(WinstonLogLevel.WARN, message);
  }

  debug?(message: string | object): void {
    this.logger.log(WinstonLogLevel.DEBUG, message);
  }

  verbose?(message: string | object): void {
    this.logger.log(WinstonLogLevel.VERBOSE, message);
  }
}
