import winston, { format }  from "winston";

// Custom log format
const myFormat = format.printf((info) => {
    return `[${info.timestamp}] ${info.level}: ${info.stack || info.message}`;
  });

const log = winston.createLogger({
  level: "info",
  format: format.combine(
    format(info => ({ ...info, level: info.level.toUpperCase(), stack: info.stack }))(),
    format.colorize(),
    format.timestamp({format: 'HH:mm:ss.SSS'}),
    format.errors({ stack: true }),
    myFormat,
  ),
  transports: [
    new winston.transports.Console()
  ],
});

export default log;