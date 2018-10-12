'use strict';
const {When} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;

When(/^I remember text of "([^"]*)" as "([^"]*)"/, async(alias, key) => {
    const text = await step.getText(alias);
    memory.store(key, text);
})

When(/^I remember number of "([^"]*)" as "([^"]*)"/, async(alias, key) => {
    const number = await step.getNumberOfElements(alias);
    memory.store(key, number);
})