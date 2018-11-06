const chai = require('chai');
const memory = browser.params.MEMORY;
const expect = chai.expect;

describe('Memory tests', () => {

    beforeEach(() => {
        memory.clean();
    })

    it('should parse string that is a key', () => {
        memory.store('$key', 'value');
        const parsedValue = memory.parseString('$key');
        expect(parsedValue).to.be.eql('value');
    })

    it('should parse string that is not a key', () => {
        memory.store('$key', 'value');
        const parsedValue = memory.parseString('key');
        expect(parsedValue).to.be.eql('key');
    })

    it('should return initial value when parsing a number', () => {
        const parsedValue = memory.parseString(5);
        expect(parsedValue).to.be.eql(5);
    })

    it('should get value by a parsed key', () => {
        memory.store('key', 'value');
        const parsedValue = memory.parseString('$key');
        expect(parsedValue).to.be.eql('value');
    })

    it('should parse a string containing multiple keys', () => {
        memory.store('index1', '1');
        memory.store('index2', '2');
        memory.store('index3', '3');
        const parsedValue = memory.parseString('$index1 and $index2 and $index3');
        expect(parsedValue).to.be.eql('1 and 2 and 3');
    })

    it('should be able to clean storage', () => {
        memory.store('key', 'value');
        memory.clean();
        expect(memory.storage).to.be.eql({});
    })

})