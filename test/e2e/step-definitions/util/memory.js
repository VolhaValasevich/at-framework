const logger = require('./logger').logger;

class Memory {
    constructor() {
        this.storage = {};
    }

    parseString(string) {
        if (typeof string === 'string' && string.match(/\$[\w-]+/) !== null) {
            string.match(/\$[\w-]+/g).forEach((match) => {
                const value = this.get(match.substring(1));
                string = string.replace(match, value)
            })
        }
        return string;
    }

    store(key, value) {
        if (typeof key === 'string' && key.match(/^\$[\w-]+/)) {
            key = key.substring(1);
        }
        if (this.storage[key]) {
            logger.warn(`Overwriting ${key} with ${value}`);
        }
        logger.action(`Saving [${value}] as [$${key}]`);
        this.storage[key] = value;
    }

    get(key) {
        if (!this.storage[key]) {
            logger.error(`No [${key}] object found in memory.`);
            return `${key}`;
        }
        return this.storage[key];
    }

    clean() {
        this.storage = {};
        logger.info('Memory was cleaned');
    }
}

const instance = new Memory();

module.exports = instance;