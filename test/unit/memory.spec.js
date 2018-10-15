const chai = require('chai');
const memory = browser.params.MEMORY;
const expect = chai.expect;

describe('Memory tests', () => {

    beforeEach(() => {
        memory.clean();
    })

    it('should parse string that is a key', () => {
        memory.store('$key', 'value');
        expect(memory.parseString('$key')).to.be.eql('value');
    })

    it('should parse string that is not a key', () => {
        memory.store('$key', 'value');
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