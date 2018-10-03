const collector = require('./POCollector');
const path = require('path');

class ElementHelper {
    constructor(dir, baseUrl) {
        collector.collectData(dir);
        this.masterPO = require(path.resolve(dir, 'MasterPO.json'));
        this.baseUrl = baseUrl;
    }

    getPageElement(fullElementPath) {

    }

    getPageObject() {
        return browser.getCurrentUrl().then((url) => {
            url = url.replace(this.baseUrl, '').replace('/', '');
            return this.masterPO[url];
        });
    }

    parsePath(fullElementPath) {
        return fullElementPath.split('>').map((el) => {
            return el.trim();
        })
    }
}

module.exports = ElementHelper;