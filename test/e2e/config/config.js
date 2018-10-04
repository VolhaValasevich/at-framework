'use strict';

const path = require('path');

exports.config = {
    allScriptsTimeout: 200000,
    getPageTimeout: 200000,
    specs: [path.resolve('./test/e2e/features/*.feature')],
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    capabilities: {
        browserName: 'chrome'
    },
    disableChecks: true,
    cucumberOpts: {
        require: [path.resolve('./test/e2e/step-definitions/**/*.js')],
        ignoreUncaughtExceptions: true,
    },
    params: {
        PAGE_OBJECT_DIRECTORY: './test/e2e/po',
        BASE_URL: 'https://www.sandisk.com/'
    },
    onPrepare: () => {
        browser.manage().window().setSize(1000, 800);
    }
};