'use strict';
let {Then, When, Given} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;

When(/^I wait until "([^"]*)" is (.*)$/, (alias, shouldBe) => { // (present|clickable|visible|invisible|selected|gone)
    alias = memory.parseString(alias);
    shouldBe = memory.parseString(shouldBe);
    return step.waitUntil(alias, shouldBe);
});