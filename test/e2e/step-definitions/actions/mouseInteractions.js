'use strict';
const {When} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

When(/^I click "([^"]*)"$/, async (alias) => {
    alias = await memory.parseString(alias);
    logger.info(`I click [${alias}]`);
    return step.click(alias);
});

When(/^I click "([^"]*)" text in "([^"]*)"$/, async (text, alias) => {
    alias = await memory.parseString(alias);
    text = await memory.parseString(text);
    logger.info(`I click [${text}] text in [${alias}]`);
    const element = await step.getElementFromCollectionByText(alias, text)
    return element.click();
});

When(/^I type "([^"]*)" in "([^"]*)"$/, async (text, alias) => {
    alias = await memory.parseString(alias);
    text = await memory.parseString(text);
    logger.info(`I type [${text}] in [${alias}]`);
    if (text === 'ENTER') text = protractor.Key.ENTER;
    return step.sendKeys(alias, text);
});

When(/^I scroll to "([^"]*)"$/, async (alias) => {
    alias = await memory.parseString(alias);
    logger.info(`I scroll to [${alias}]`);
    return step.scrollElementToMiddle(alias);
})