'use strict'
const chai =  require('chai');
const expect = chai.expect;
const StepFunctions = require('../e2e/step-definitions/util/stepFunctions');

describe('Step Functions', () => {
    let step;

    beforeAll(() => {
        step = new StepFunctions('./test/unit/resources', 'https://www.sandisk.com/');
    })

    it('should check is the element is present', async() => {
        await browser.get('https://www.sandisk.com/home');
        const result = await step.isElementPresent('Header > Country Bar > Global Icon');
        expect(result).to.be.true;
    })
})