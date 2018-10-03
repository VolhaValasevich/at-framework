'use strict'
const chai =  require('chai');
const expect = chai.expect;
const ElementHelper = require('../e2e/step-definitions/util/elementHelper');

describe('Unit tests for Element Helper', () => {

    let helper;

    beforeAll(() => {
        helper = new ElementHelper('./test/unit/resources', 'https://www.sandisk.com/');
    })

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

})