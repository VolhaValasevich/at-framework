'use strict';
let {Then, When, Given} = require('cucumber');
const memory = browser.params.MEMORY;

When(/^I wait "([^"]*)" seconds$/, (waitTime) => {
    if (memory.isKey(waitTime)) waitTime = memory.get(waitTime);
    return browser.sleep(waitTime * 1000);
});

When(/^I open "([^"]*)" url$/, (url) => {
    if (memory.isKey(url)) url = memory.get(url);
    return browser.get(url);
});