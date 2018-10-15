class Memory {
    constructor() {
        this.storage = {}
    }

    isKey(string) {
        if (typeof string === 'string' && string.match(/^\$[\w\s-]+/)) return true;
        else return false;
    }

    parseString(string) {
        if (typeof string === 'string' && string.match(/^\$[\w\s-]+/)) return string.substring(1);
        else return string;
    }

    store(key, value) {
        key = this.parseString(key);
        if (this.storage[key]) throw new Error(`Object [${key}] already exists in memory!`);
        else this.storage[key] = value;
    }

    get(key) {
        key = this.parseString(key);
        if (!this.storage[key]) throw new Error(`No [${key}] object found in memory.`);
        return this.storage[key];
    }

    clean() {
        this.storage = {}
    }
}

const instance = new Memory();

module.exports = instance;