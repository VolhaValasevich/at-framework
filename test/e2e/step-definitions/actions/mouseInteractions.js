'use strict';
const {When} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;

When(/^I click "([^"]*)"$/, (alias) => {
    if (memory.isKey(alias)) alias = memory.get(alias);
    return step.click(alias);
});

When(/^I click "([^"]*)" text in "([^"]*)"$/, (text, alias) => {
    if (memory.isKey(alias)) alias = memory.get(alias);
    if (memory.isKey(text)) text = memory.get(text);
    return step.getElementFromCollectionByText(alias, text).then((el) => {
        el.click();
    })
});

When(/^I type "([^"]*)" in "([^"]*)"$/, (text, alias) => {
    if (memory.isKey(alias)) alias = memory.get(alias);
    if (memory.isKey(text)) text = memory.get(text);
    if (text === 'ENTER') text = protractor.Key.ENTER;
    return step.sendKeys(alias, text);
});