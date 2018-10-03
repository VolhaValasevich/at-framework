const collector = require('./POCollector');
const path = require('path');

class ElementHelper {
    constructor(dir) {
        collector.collectData(dir);
        this.masterPO = require(path.resolve(dir, 'MasterPO.json'));
    }

    getPageElement(fullElementPath) {
        
    }

    parsePath(fullElementPath) {
        return fullElementPath.split('>').map((el) => {
            return el.trim();
        })
    }
}

module.exports = ElementHelper;