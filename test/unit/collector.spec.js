'use strict'
const chai =  require('chai');
const expect = chai.expect;
const collector = require('../e2e/step-definitions/util/POCollector');
const expectedResult = require('./resources/expectedMasterPO.json')
const currentDir = 'D:\\Tasks\\Task2\\sandisk-framework'

describe('Unit tests for Page Object Collector', () => {
    it('should collect jsons into a master file', () => {
        collector.collectData('./test/unit/resources/');
        expect(require('./resources/MasterPO.json')).to.eql(expectedResult);
    })

    it('should throw an error if a directory with pages does not exist', ()=> {
        expect(function() { collector.getAllPages('./nonExistentDir') }).to.throw(Error, `Directory [${currentDir}\\nonExistentDir\\pages\] does not exist!`);
    })

    it('should throw an error if the directory is empty', () => {
        expect(function() { collector.getAllPages('./emptyDir') }).to.throw(Error, `Directory [${currentDir}\\emptyDir\\pages\] is empty!`); 
    })

    it('should throw an error if a json file does not exist', () => {
        expect(function() { collector.requireJson('./nonExistentFile.json') }).to.throw(Error, 'File [./nonExistentFile.json] does not exist!'); 
    })
})