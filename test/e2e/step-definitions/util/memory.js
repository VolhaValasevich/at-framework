class Memory {
    constructor() {
        this.storage = {}
    }

    isKey(string) {
        if (string.match(/^\$\w+/)) return true;
        else return false;
    }

    parseString(string) {
        if (string.match(/^\$\w+/)) return string.substring(1);
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