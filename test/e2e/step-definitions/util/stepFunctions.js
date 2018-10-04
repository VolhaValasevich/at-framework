const ElementHelper = require('./elementHelper');
const until = protractor.ExpectedConditions;

class StepFunctions {
    constructor(dir, url) {
        this.helper = new ElementHelper(dir, url);
    }

    isElementPresent(alias) {
        return this.helper.getElement(alias).then((el) => {
            return el.isPresent();
        })
    }

    waitUntilPresent(alias) {
        return this.helper.getElement(alias).then((el) => {
            return browser.wait(el, 30000);
        })
    }

    sendKeys(alias, keys) {
        return this.helper.getElement(alias).then((el) => {
            return el.sendKeys(keys);
        }) 
    }

    getText(alias) {
        return this.helper.getElement(alias).then((el) => {
            return el.getText();
        }) 
    }
}

module.exports = StepFunctions;