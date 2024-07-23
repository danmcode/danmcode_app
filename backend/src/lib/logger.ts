import { existsSync, mkdirSync } from 'fs';
import { Logger } from 'winston';
import winston = require('winston');

const logDir = './logs';

if (!existsSync(logDir)) {
	mkdirSync(logDir);
}

const customFormat = winston.format.printf(({ timestamp, level, message}) => {
    return `${timestamp} ${level}: ${ JSON.stringify(message) }`;
});

const logger: Logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
        }),
		customFormat,
    ),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			level: 'info', 
			filename: `${logDir}/info.log` 
		}),
		new winston.transports.File({
			level: 'error', 
			filename: `${logDir}/error.log` 
		}),
	],
});

export default logger;
