const logger = require('./logger').logger;
const util = require('util');

function getTags({ tags }) {
    let included = '';
    let excluded = '';
    if (tags) {
        tags.split(',').forEach((element) => {
            element = element.trim();
            if (element.match(/^~?@\w+/) !== null) {
                if (element.startsWith('~')) excluded += `${element},`;
                else included += `${element} or `;
            } else throw new Error(`Could not parse the tag [${element}]: all tags should start with @ and contain only word characters.`);
        });
        if (included.length > 0) included = included.slice(0, -4);
        if (excluded.length > 0) excluded = excluded.slice(0, -1);
    }
    logger.info(`Included tags: [${included}], excluded tags: [${excluded}]`);
    if (excluded.length > 0) return [excluded, included];
    else return included;
}

function getCapabilities({ browserName = 'chrome', maxInstances = 1 }) {
    const capabilities = {};
    capabilities.browserName = browserName;
    capabilities.shardTestFiles = maxInstances > 1;
    capabilities.maxInstances = maxInstances;
    logger.info(`Browser started with capabilities: ${util.inspect(capabilities, false, null)}`);
    return capabilities;
}

module.exports = { getTags, getCapabilities };