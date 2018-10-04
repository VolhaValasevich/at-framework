exports.config = {

    specs: ['../*.spec.js'],

    capabilities: {
        browserName: 'chrome'
    },

    onPrepare: () => {
        browser.driver.manage().window().maximize();
    }
};