'use strict'
const chai =  require('chai');
const expect = chai.expect;
const helper = require('../e2e/step-definitions/util/elementHelper');

describe('Unit tests for Element Helper', () => {

    it('should trim a path to element', () => {
        const expectedResult = ['Home', 'Header', 'Navigation Bar'];
        const result = helper.parsePath('Home > Header > Navigation Bar');
        expect(result).to.be.eql(expectedResult);
    })

    it('should search for a page object based on current url', async() => {
        await browser.get('https://www.sandisk.com/home')
        const result = await helper.getPageObject();
        expect(result).to.be.eql(helper.masterPO.home);
    })

    it('should search for an element by its full path', async() => {
        await browser.get('https://www.sandisk.com/home')
        const element = await helper.getPageObjectElement('Header > Country Bar > Global Icon');
        expect(element.selector).to.be.eql('span.icon-global')
    })

    it('should find element on the page and perform check', async() => {
        await browser.get('https://www.sandisk.com/home');
        const element = await helper.getElement('Header > Country Bar > Global Icon');
        const result = await element.isPresent();
        expect(result).to.be.true;
    })
})