'use strict';
let { When } = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;
const logger = require('../util/logger').logger;

When(/^I wait until "([^"]*)" is (present|clickable|visible|invisible|selected|gone)$/, async (alias, shouldBe) => { 
    alias = await memory.parseString(alias);
    shouldBe = await memory.parseString(shouldBe);
    logger.info(`I wait until [${alias}] is ${shouldBe}`);
    return step.waitUntil(alias, shouldBe);
});