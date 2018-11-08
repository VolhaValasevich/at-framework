const logger = require('./logger').logger;

class Memory {
    constructor() {
        this.storage = {};
    }

    parseString(string) {
        if (typeof string === 'string' && string.match(/\$[\w-]+/) !== null) {
            if (string.match(/\$\$[\w-]+/) !== null && this.constants) {
                string.match(/\$\$[\w-]+/g).forEach((match) => {
                    const value = this.getConstant(match.substring(2));
                    string = string.replace(match, value)
                })
            }
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

    getConstant(key) {
        if (!this.constants[key]) {
            logger.error(`No [${key}] object found in memory constants.`);
            return `${key}`;
        }
        return this.constants[key];
    }

    setConstants(path) {
        try {
            this.constants = require(path);
        } catch (err) {
            logger.warn(`Cannot load memory constants - ${err.message}`);
        }
    }

    clean() {
        this.storage = {};
        logger.info('Memory was cleaned');
    }
}

const instance = new Memory();

module.exports = instance;