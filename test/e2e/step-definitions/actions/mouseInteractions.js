'use strict';
const {When} = require('cucumber');
const step = require('../util/stepFunctions');

When(/^I click "([^"]*)"$/, (alias) => {
    return step.click(alias);
});

When(/^I click "([^"]*)" text in "([^"]*)"$/, (text, alias) => {
    return step.getElementFromCollectionByText(alias, text).then((el) => {
        el.click();
    })
});