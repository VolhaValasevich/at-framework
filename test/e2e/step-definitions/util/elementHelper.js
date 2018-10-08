const collector = require('./POCollector');
const path = require('path');

class ElementHelper {
    constructor() {
        collector.collectData(browser.params.PAGE_OBJECT_DIRECTORY);
        this.masterPO = require(path.resolve(browser.params.PAGE_OBJECT_DIRECTORY, 'MasterPO.json'));
        this.baseUrl = browser.params.BASE_URL;
    }

    async getElement(fullElementPath) {
        const elementPath = this.parsePath(fullElementPath);
        let pageObject = await this.getPageObject();
        let elementToGet = await element(by.css('html'));
        elementPath.forEach((alias) => {
            let number = alias.match(/#\d+/);
            if (number) {
                number = number[0].substring(1);
                alias = alias.replace(/#\d+/, '').trim();
            }
            pageObject = pageObject.children[alias];
            elementToGet = this.getChildElement(elementToGet, pageObject, number);
        })
        return elementToGet;
    }

    getChildElement(elementToGet, pageObject, number) {
        if (number !== null) {
            return elementToGet.all(by.css(pageObject.selector)).then((array) => { return array[number - 1] });
        } else if (pageObject.isCollection) {
            return elementToGet.all(by.css(pageObject.selector));
        } else {
            return elementToGet.element(by.css(pageObject.selector));
        }        
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