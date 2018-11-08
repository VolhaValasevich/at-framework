const path = require('path');

exports.config = {

    specs: ['../*.spec.js'],

    capabilities: {
        browserName: 'chrome'
    },

    params: {
        PAGE_OBJECT_DIRECTORY: path.resolve('./test/unit/resources'),
        BASE_URL: 'https://www.sandisk.com/',
        MEMORY: require(path.resolve('./test/e2e/step-definitions/util/memory'))
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 40000
    },

    onPrepare: () => {
        browser.params.MEMORY.setConstants(path.resolve('./test/unit/resources/constants.json'));
        browser.driver.manage().window().maximize();
    }
};