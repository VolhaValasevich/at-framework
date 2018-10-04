'use strict';
const {When} = require('cucumber');
const step = require('../util/stepFunctions');

When(/^I click "([^"]*)"$/, (alias) => {
    return elementHelper.click(alias);
});