const ElementHelper = require('./elementHelper');
const until = protractor.ExpectedConditions;
const EC = protractor.ExpectedConditions;
const logger = require('./logger').logger;

class StepFunctions {
    constructor() {
        this.helper = ElementHelper;
    }

    async isElementPresent(alias) {
        logger.action(`Checking if [${alias}] is present`);
        try {
            const el = await this.helper.getElement(alias);
            if (el.length) {
                throw new Error('element is a collection');
            }
            return el.isPresent();
        }
        catch (err) {
            throw new Error(`Cannot check if [${alias}] is present - ${err.message}`);
        }
    }

    expectedCondition(shouldBe) {
        const obj = {
            present: EC.presenceOf.bind(EC),
            clickable: EC.elementToBeClickable.bind(EC),
            visible: EC.visibilityOf.bind(EC),
            invisible: EC.invisibilityOf.bind(EC),
            selected: EC.elementToBeSelected.bind(EC),
            gone: EC.stalenessOf.bind(EC)
        }
        if (!obj[shouldBe]) {
            throw new Error(`[${shouldBe}] is not an expected condition`);
        }
        return obj[shouldBe];
    }

    async waitUntil(alias, shouldBe) {
        logger.action(`Waiting until [${alias}] is ${shouldBe}`);
        const expectedConditionFunction = this.expectedCondition(shouldBe);
        try {
            const el = await this.helper.getElement(alias);
            return browser.wait(expectedConditionFunction(el), 30000);
        }
        catch (err) {
            throw new Error(`Cannot wait until [${alias}] is ${shouldBe} - ${err.message}`);
        }
    }

    async sendKeys(alias, keys) {
        logger.action(`Sending [${keys}] to [${alias}]`);
        try {
            const el = await this.helper.getElement(alias);
            if (el.length) {
                throw new Error('element is a collection');
            }
            return el.sendKeys(keys);
        }
        catch (err) {
            throw new Error(`Cannot send keys to [${alias}] - ${err.message}`);
        }
    }

    async getText(alias) {
        logger.action(`Getting text from [${alias}]`);
        try {
            const el = await this.helper.getElement(alias);
            if (el.length) {
                throw new Error('element is a collection');
            }
            return el.getText();
        }
        catch (err) {
            throw new Error(`Cannot get text of [${alias}] - ${err.message}`);
        }
    }

    async getAttribute(alias, attribute) {
        logger.action(`Getting ${attribute} of [${alias}]`);
        try {
            const el = await this.helper.getElement(alias);
            if (el.length) {
                throw new Error('element is a collection');
            }
            return el.getAttribute(attribute);
        }
        catch (err) {
            throw new Error(`Cannot get attribute [${attribute}] of [${alias}] - ${err.message}`);
        }
    }

    async click(alias) {
        logger.action(`Clicking on [${alias}]`);
        try {
            const el = await this.helper.getElement(alias);
            if (el.length) {
                throw new Error('element is a collection');
            }
            await el.click();
        }
        catch (err) {
            throw new Error(`Cannot click on [${alias}] - ${err.message}`);
        }
    }

    async getNumberOfElements(alias) {
        logger.action(`Getting number of [${alias}]`);
        try {
            const el = await this.helper.getElement(alias);
            if (!el.length) {
                throw new Error('element is not a collection');
            }
            return el.length;
        }
        catch (err) {
            throw new Error(`Cannot get number of [${alias}] - ${err.message}`);
        }
    }

    async getIndexOfElementByText(alias, text) {
        const collection = await this.helper.getElement(alias);
        if (!collection.length) {
            throw new Error(`Cannot get element with text [${text}] - [${alias}] is not a collection!`);
        }
        for (let i = 0; i < collection.length; i++) {
            const elementtext = await collection[i].getText();
            if (text === elementtext) {
                return i;
            }
        }
        throw new Error(`No element with text [${text}] in [${alias}]!`);
    }

    async getElementFromCollectionByText(alias, text) {
        logger.action(`Getting element with [${text}] text from [${alias}]`);
        const collection = await this.helper.getElement(alias);
        const index = await this.getIndexOfElementByText(alias, text);
        return collection[index];
    }

    async scrollElementToMiddle(alias) {
        const element = await this.helper.getElement(alias);
        const location = await element.getLocation();
        const scrollLength = await browser.executeScript('return window.document.body.offsetHeight');
        const outerHeight = await browser.executeScript('return window.outerHeight');
        let elementYpos = location.y;
        logger.info('scrollLength: ' + scrollLength);
        logger.info('elementYpos: ' + elementYpos);
        logger.info('outerHeight: ' + outerHeight);
        if (scrollLength - elementYpos >= outerHeight * 0.5) {
            elementYpos -= (outerHeight * 0.5);
        }
        logger.info('scrollTo: ' + elementYpos);
        return browser.executeScript('window.scrollTo(0, arguments[0])', elementYpos);
    };

    async isElementInViewport(alias, partially) {
        const element = await this.helper.getElement(alias);
        const rect = await browser.executeScript('return arguments[0].getBoundingClientRect();', element);
        const innerHeight = await browser.executeScript('return window.innerHeight');
        const innerWidth = await browser.executeScript('return window.innerWidth');
        const clientHeight = await browser.executeScript('return window.document.documentElement.clientHeight');
        const clientWidth = await browser.executeScript('return window.document.documentElement.clientWidth');
        if (partially) {
            return (
                rect.bottom > 0 &&
                rect.right > 0 &&
                rect.left < (innerWidth || clientWidth) &&
                rect.top < (innerHeight || clientHeight)
            )
        }
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (innerHeight || clientHeight) &&
            rect.right <= (innerWidth || clientWidth)
        );
    }

    async getAllTextLinesFromCollection(alias) {
        const counter = await this.getNumberOfElements(alias);
        let linesText = [];
        let foundElement;
        for (let i = 0; i < counter; i++) {
            foundElement = await this.getText(`${alias} #${i + 1}`);
            linesText.push(foundElement);
        }
        return linesText;
    }
}

module.exports = new StepFunctions();