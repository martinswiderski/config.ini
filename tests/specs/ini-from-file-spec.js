require('./../../src/tool/test-signature')(__filename);

var configIni = require('./../../index'),
    file      = __dirname + '/../props/config.ini';

describe('Reads object from a file', function () {
    it('correctly formatted .ini file', function () {
        expect(typeof configIni.load(file)).toBe('object');
        expect(typeof configIni.load(file).SectionOne).toBe('object');
        expect(configIni.load(file).SectionOne.integer).toBe(1234);
        expect(typeof configIni.load(file).SectionOne.integer).toBe('number');
        expect(typeof configIni.load(file).SectionTwo).toBe('object');
        expect(configIni.load(file).SectionTwo.real).toBe(3.14);
        expect(typeof configIni.load(file).SectionTwo.real).toBe('number');
    });
    it('incorrectly formatted or non-existing .ini file', function () {
        expect(configIni.load('/tmp/BSS')).toBe(false);
        expect(typeof configIni.load('/tmp/BSS')).toBe('boolean');
    });
});


