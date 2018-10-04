exports.config = {

    specs: ['../*.spec.js'],

    capabilities: {
        browserName: 'chrome'
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 40000
    },

    onPrepare: () => {
        browser.driver.manage().window().maximize();
    }
};