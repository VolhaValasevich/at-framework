'use strict';
let {Then, When, Given} = require('cucumber');
const expect = require('chai').expect;
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;

Then(/^"([^"]*)" should( not)? be visible$/, async (alias, notArg) => {
    alias = memory.parseString(alias);
    notArg = notArg ? ' not' : '';
    let result = await step.isElementPresent(alias);
    return expect(result).to.be.equal(!notArg);
});

Then(/^Count of "([^"]*)" should( not)? be "([^"]*)"$/, async (alias, notArg, expectedNumber) => {
    alias = memory.parseString(alias);
    expectedNumber = memory.parseString(expectedNumber);
    notArg = notArg ? ' not' : '';
    let result = await step.getNumberOfElements(alias);
    expectedNumber = parseInt(expectedNumber, 10);
    if (notArg) {
        return expect(result).to.not.equal(expectedNumber);   
    }
    else {
        return expect(result).to.equal(expectedNumber);
    }
});

Then(/^Text of "([^"]*)" should( not)? contain "([^"]*)"$/, async (alias, notArg, textToContain) => {
    alias = memory.parseString(alias);
    textToContain = memory.parseString(textToContain);
    notArg = notArg ? ' not' : '';
    let elementText = await step.getText(alias);
    if (notArg) {
        return expect(elementText).to.not.contain(textToContain);   
    }
    else {
        return expect(elementText).to.contain(textToContain);
    }
});

Then(/^Text of "([^"]*)" should( not)? equal "([^"]*)"$/, async (alias, notArg, textToContain) => {
    alias = memory.parseString(alias);
    textToContain = memory.parseString(textToContain);
    notArg = notArg ? ' not' : '';
    let elementText = await step.getText(alias);
    return expect(elementText).to.be.eql(textToContain);    
});

Then(/^Page title should( not)? be "([^"]*)"$/, async (notArg, text) => {
    text = memory.parseString(text);
    notArg = notArg ? ' not' : '';
    let pageTitle = await browser.getTitle();
    if (notArg) {
        return expect(pageTitle).to.not.equal(text);
    }
    else {
        return expect(pageTitle).to.be.equal(text);
    }  
});