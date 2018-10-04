const collector = require('./POCollector');
const path = require('path');

class ElementHelper {
    constructor() {
        collector.collectData(browser.params.PAGE_OBJECT_DIRECTORY);
        this.masterPO = require(path.resolve(browser.params.PAGE_OBJECT_DIRECTORY, 'MasterPO.json'));
        this.baseUrl = browser.params.BASE_URL;
    }

    async getElement(fullElementPath) {
        let elementToGet = await this.getPageObjectElement(fullElementPath);
        let selector
        if (elementToGet.byLinkText) {
            selector = by.linkText(elementToGet.selector);
        } else {
            selector = by.css(elementToGet.selector);
        }
        if (elementToGet.isCollection) {
            elementToGet = element.all(selector);
            return elementToGet;
        } else {
            elementToGet = element(selector);
            return elementToGet;
        }
    }

    async getPageObjectElement(fullElementPath) {
        const elementPath = this.parsePath(fullElementPath);
        let elementToGet = await this.getPageObject();
        elementPath.forEach((alias) => {
            elementToGet = elementToGet.children[alias];
        })
        return elementToGet;
    }

    async getPageObject() {
        let url = await browser.getCurrentUrl();
        url = url.replace(this.baseUrl, '').replace('/', '');
        return this.masterPO[url];
    }

    parsePath(fullElementPath) {
        return fullElementPath.split('>').map((el) => {
            return el.trim();
        })
    }
}

module.exports = new ElementHelper();