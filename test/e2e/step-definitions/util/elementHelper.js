const collector = require('./POCollector');
const path = require('path');
const util = require('util');

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
            let number = this.getNumberOfElement(alias);
            alias = alias.replace(/#\d+|first|second|last/, '').trim();
            if (!pageObject.children[alias]) throw new Error(`No child element [${alias}] in ${util.inspect(pageObject, false, 1)}`); //unit
            pageObject = pageObject.children[alias];
            elementToGet = this.getChildElement(elementToGet, pageObject, number);
        })
        return elementToGet;
    }

    getNumberOfElement(alias) {     
        let number = alias.match(/#\d+|first|second|last/);
        if (number) {
            switch (number[0]) {    //string.match returns an array if there's a match; substring deletes #
                case 'first': {
                    number = 1;
                    break;
                }
                case 'second': {
                    number = 2;
                    break;
                }
                case 'last': {
                    number = 0;
                    break;
                }
                default: {
                    number = number[0].substring(1);    
                }
            }
        }
        return number;
    }

    getChildElement(elementToGet, pageObject, number) {
        if (number !== null) {  //string.match returns null if there's no match
            if (!pageObject.isCollection) throw new Error(`Error in getting #${number} instance of [${pageObject.selector}] - not a collection!`) 
            return elementToGet.all(by.css(pageObject.selector)).get(number - 1);
        } else if (pageObject.isCollection) {
            return elementToGet.all(by.css(pageObject.selector));
        } else {
            return elementToGet.element(by.css(pageObject.selector));
        }
    }

    async getPageObject() {
        let url = await browser.getCurrentUrl();
        url = url.replace(this.baseUrl, '');  
        if (!this.masterPO[url]) throw new Error(`No Page Object found for [${url}]!`);
        return this.masterPO[url];
    }

    parsePath(fullElementPath) {
        return fullElementPath.split('>').map((el) => {
            return el.trim();
        })
    }
}

module.exports = new ElementHelper();