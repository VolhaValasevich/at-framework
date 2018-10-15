'use strict';
let {Then, When, Given} = require('cucumber');
const memory = browser.params.MEMORY;

When(/^I wait "([^"]*)" seconds$/, (waitTime) => {
    waitTime = memory.parseString(waitTime);
    return browser.sleep(waitTime * 1000);
});

When(/^I open "([^"]*)" url$/, (url) => {
    url = memory.parseString(url);
    return browser.get(url);
});