exports.config = {

    specs: ['../*.spec.js'],

    capabilities: {
        browserName: 'chrome'
    },

    params: {
        PAGE_OBJECT_DIRECTORY: './test/unit/resources',
        BASE_URL: 'https://www.sandisk.com/'
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 40000
    },

    onPrepare: () => {
        browser.driver.manage().window().maximize();
    }
};