import winston from 'winston';

const logConfiguration = {
    transports: [
        new winston.transports.File({
            filename: 'logs/server.log',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                winston.format.align(),
                winston.format.printf(
                    (info) =>
                        `${info.level}: ${[info.timestamp]}: ${
                            info.err.message
                        }`
                )
            ),
        }),
    ],
};

export default winston.createLogger(logConfiguration);
