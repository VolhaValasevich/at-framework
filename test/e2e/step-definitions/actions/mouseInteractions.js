'use strict';
const {When} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;

When(/^I click "([^"]*)"$/, (alias) => {
    alias = memory.parseString(alias);
    return step.click(alias);
});

When(/^I click "([^"]*)" text in "([^"]*)"$/, (text, alias) => {
    alias = memory.parseString(alias);
    text = memory.parseString(text);
    return step.getElementFromCollectionByText(alias, text).then((el) => {
        el.click();
    })
});

When(/^I type "([^"]*)" in "([^"]*)"$/, (text, alias) => {
    alias = memory.parseString(alias);
    text = memory.parseString(text);
    if (text === 'ENTER') text = protractor.Key.ENTER;
    return step.sendKeys(alias, text);
});