'use strict'
const chai =  require('chai');
const expect = chai.expect;
const step = require('../e2e/step-definitions/util/stepFunctions');

describe('Step Functions', () => {
    
    beforeEach(async() => {
        await browser.get('https://www.sandisk.com/home');
    })

    it('should check is the element is present', async() => {
        const result = await step.isElementPresent('Header > Country Bar > Global Icon');
        expect(result).to.be.true;
    })

    it('should wait for an element', async() => {
        await step.waitUntil('Product List > Results Bar > Selected Category', 'present');
        const result = await step.isElementPresent('Product List > Results Bar > Selected Category');
        expect(result).to.be.true;
    })

    it('should get element text', async() => {
        const result = await step.getText('Product List > Results Bar > Selected Category');
        expect(result).to.be.eql('Featured Items');
    })

    it('should send keys to an element', async() => {
        await step.sendKeys('Functional Footer > Solutions Links > Search Container > Footer Search Bar', 'disk');
        await step.sendKeys('Functional Footer > Solutions Links > Search Container > Footer Search Bar', protractor.Key.ENTER);
        const url = await browser.getCurrentUrl();
        expect(url).to.be.eql('https://www.sandisk.com/tools/search?q=disk');
    })

    it('should get element from collection by text', async() => {
        const element = await step.getElementFromCollectionByText('Header > Navigation Bar > Navigation Links', 'SSD');
        const text = await element.getText();
        expect(text).to.be.eql('SSD');
    })

    it('should get element count', async() => {
        const number = await step.getNumberOfElements('Header > Navigation Bar > Navigation Links');
        expect(number).to.be.eql(8);
    })

    it('chould click on an element', async() => {
        await step.click('Product List > Results Panel > Search Results #2 > Button #2');
    })
})