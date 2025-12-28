import morgan from "morgan";
import winston from "winston";
import path from "path";
import fs from "fs";

// Ensure logs directory exists
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Winston logger configuration
const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }), // include stack trace
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    // Console output for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Error log file
    new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
    // Combined log file
    new winston.transports.File({ filename: path.join(logDir, "combined.log") })
  ],
  exitOnError: false
});

// Morgan middleware for HTTP request logging
const morganMiddleware = morgan("combined", {
  stream: {
    write: message => winstonLogger.info(message.trim())
  }
});

export { winstonLogger as logger, morganMiddleware };
