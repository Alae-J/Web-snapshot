// logger.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', // adjust the level as needed
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [new winston.transports.Console()],
});

module.exports = logger;
