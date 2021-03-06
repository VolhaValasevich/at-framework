const { createLogger, format, transports, addColors } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const myCustomLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        action: 3
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        action: 'white' 
    }
};

addColors(myCustomLevels.colors);

class Logger {
    constructor() {
        this.logger = createLogger({
            levels: myCustomLevels.levels,
            transports: [
                new transports.Console({
                    format: combine(
                        label({ label: 'CCH iKnow AU' }),
                        timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss'
                        }),
                        format.colorize({
                            all: true
                        }),
                        myFormat
                    ),
                    level: 'action'
                }),
                new transports.File({ filename: 'combined.log', format: format.simple(), level: 'action' })
            ]
        });
    }
}

module.exports = new Logger();