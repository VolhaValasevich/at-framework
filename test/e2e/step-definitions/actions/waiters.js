'use strict';
let {Then, When, Given} = require('cucumber');
const step = require('../util/stepFunctions');
const memory = browser.params.MEMORY;

When(/^I wait until "([^"]*)" is (.*)$/, (alias, shouldBe) => { // (present|clickable|visible|invisible|selected|gone)
    if (memory.isKey(alias)) alias = memory.get(alias);
    if (memory.isKey(shouldBe)) shouldBe = memory.get(shouldBe);
    return step.waitUntil(alias, shouldBe);
});