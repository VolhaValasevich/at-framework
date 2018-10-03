const path = require('path');
const fs = require('fs');

class POCollector {
    constructor() {
        this.masterPO = {};
    }

    getReferences(obj) {
        if (obj.ref) {
            const masterselector = obj.selector;
            obj = JSON.parse(fs.readFileSync(path.resolve(obj.ref)))
            if (masterselector) {
                obj.selector = masterselector + obj.selector;
            }
        }
        if (obj.children) {
            Object.keys(obj.children).forEach((key) => {
                obj.children[key] = this.getReferences(obj.children[key]);
            });
        }
        return obj;
    }

    getAllPages(dir) {
        const pages = fs.readdirSync(path.resolve(dir));
        pages.forEach((page) => {
            if (page === 'MasterPO.json') return;
            let pageObj = require(path.resolve(dir, page));
            pageObj = this.getReferences(pageObj);
            this.masterPO[pageObj.name] = pageObj;
        })
    }

    saveMasterObject(dir) {
        fs.writeFileSync(path.resolve(dir, 'MasterPO.json'), JSON.stringify(this.masterPO));
    }

    collectData(dir) {
        this.getAllPages(dir);
        this.saveMasterObject(dir);
    }
}

module.exports = new POCollector();

