const ElementHelper = require('./elementHelper');
const until = protractor.ExpectedConditions;

class StepFunctions {
    constructor() {
        this.helper = ElementHelper;
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

    click(alias) {
        return this.helper.getElement(alias).then((el) => {
            return el.click();
        }) 
    }

    getNumberOfElements(alias) {
        return this.helper.getElement(alias).then((el) => {
            return el.count();
        })
    }
}

module.exports = new StepFunctions();