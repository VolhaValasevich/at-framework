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
        browser.wait(until.presenceOf(this.helper.getElement(alias)), 30000);
    }

    sendKeys(alias, keys) {
        this.helper.getElement(alias).sendKeys(keys);
    }
}

module.exports = StepFunctions;