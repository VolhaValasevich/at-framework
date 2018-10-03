'use strict'
const chai =  require('chai');
const expect = chai.expect;
const collector = require('../e2e/step-definitions/util/POCollector');
const expectedResult = require('./resources/expectedMasterPO.json')

describe('Unit tests for Page Object Collector', () => {
    it('should collect jsons into a master file', () => {
        collector.collectData('./test/unit/resources/');
        expect(require('./resources/MasterPO.json')).to.eql(expectedResult);
    })
})