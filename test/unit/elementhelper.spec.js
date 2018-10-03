'use strict'
const chai =  require('chai');
const expect = chai.expect;
const ElementHelper = require('../e2e/step-definitions/util/elementHelper');

describe('Unit tests for Element Helper', () => {

    let helper;

    before(() => {
        helper = new ElementHelper('./test/unit/resources');
    })

    it('should trim a path to element', () => {
        const expectedResult = ['Home', 'Header', 'Navigation Bar'];
        const result = helper.parsePath('Home > Header > Navigation Bar');
        expect(result).to.be.eql(expectedResult);
    })

})