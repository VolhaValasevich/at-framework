const collector = require('./POCollector');
const path = require('path');

class ElementHelper {
    constructor(dir, baseUrl) {
        collector.collectData(dir);
        this.masterPO = require(path.resolve(dir, 'MasterPO.json'));
        this.baseUrl = baseUrl;
    }

    async getPageElement(fullElementPath) {
        const elementPath = this.parsePath(fullElementPath);
        let elementToGet = await this.getPageObject();
        elementPath.forEach((alias) => {
            elementToGet = elementToGet.children[alias];
        })
        return elementToGet;
    }

    async getPageObject() {
        let url = await browser.getCurrentUrl();
        url = url.replace(this.baseUrl, '').replace('/', '');;
        return this.masterPO[url];
    }

    parsePath(fullElementPath) {
        return fullElementPath.split('>').map((el) => {
            return el.trim();
        })
    }
}

module.exports = ElementHelper;