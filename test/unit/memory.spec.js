const chai = require('chai');
const memory = browser.params.MEMORY;
const expect = chai.expect;

describe('Memory tests', () => {

    beforeEach(() => {
        memory.clean();
    })

    it ('should recognize a string as a key', () => {
        expect(memory.isKey('$key')).to.be.true;
    })

    it ('should recognize a string that is not a key', () => {
        expect(memory.isKey('key')).to.be.false;
    })

    it('should recognize a number as not a key', () => {
        expect(memory.isKey(5)).to.be.false;
    })

    it('should parse string that is a key', () => {
        expect(memory.parseString('$key')).to.be.eql('key');
    })

    it('should parse string that is not a key', () => {
        expect(memory.parseString('key')).to.be.eql('key');
    })

    it('should return initial value when parsing a number', () => {
        expect(memory.parseString(5)).to.be.eql(5);
    })

    it('should store value in memory by an unparsed key', () => {
        memory.store('$key', 'value');
        expect(memory.storage.key).to.be.eql('value');
    })

    it('should store value in memory by a parsed key', () => {
        memory.store('key', 'value');
        expect(memory.storage.key).to.be.eql('value');
    })

    it('should get value by an unparsed key', () => {
        memory.store('key', 'value');
        expect(memory.get('$key')).to.be.eql('value');
    })

    it('should get value by a parsed key', () => {
        memory.store('key', 'value');
        expect(memory.get('key')).to.be.eql('value');
    })

    it('should be able to clean storage', () => {
        memory.store('key', 'value');
        memory.clean();
        expect(memory.storage).to.be.eql({});
    })
})