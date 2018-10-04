const ElementHelper = require('./elementHelper');
const until = protractor.ExpectedConditions;
const EC = protractor.ExpectedConditions;

class StepFunctions {
    constructor() {
        this.helper = ElementHelper;
    }

    isElementPresent(alias) {
        return this.helper.getElement(alias).then((el) => {
            return el.isPresent();
        })
    }

    expectedCondition(shouldBe) {
        let expectedConditionFunction;
        switch (shouldBe) {
            case 'present':
                expectedConditionFunction = EC.presenceOf.bind(EC);
                break;
            case 'clickable':
                expectedConditionFunction = EC.elementToBeClickable.bind(EC);
                break;
            case 'visible':
                expectedConditionFunction = EC.visibilityOf.bind(EC);
                break;
            case 'invisible':
                expectedConditionFunction = EC.invisibilityOf.bind(EC);
                break;
            case 'selected':
                expectedConditionFunction = EC.elementToBeSelected.bind(EC);
                break;
            case 'gone':
                expectedConditionFunction = EC.stalenessOf.bind(EC);
                break;
            default:
                throw new Error('Wrong expected condition provided.');
        }
        return expectedConditionFunction;
    }

    waitUntil(alias, shouldBe) {
        const expectedConditionFunction = this.expectedCondition(shouldBe);
        return this.helper.getElement(alias).then((el) => {
            return browser.wait(expectedConditionFunction(el), 30000);
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