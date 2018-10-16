const logger = require('./logger').logger;

function getTags({ tags }) {
    let included = '';
    let excluded = '';
    if (tags) {
        tags.split(',').forEach((element, index, array) => {
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

module.exports = getTags;