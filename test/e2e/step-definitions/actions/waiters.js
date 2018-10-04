'use strict';
let {Then, When, Given} = require('cucumber');
const step = require('../util/stepFunctions');

When(/^I wait until "([^"]*)" is (.*)$/, (alias, shouldBe) => { // (present|clickable|visible|invisible|selected|gone)
    return step.waitUntil(alias, shouldBe);
});