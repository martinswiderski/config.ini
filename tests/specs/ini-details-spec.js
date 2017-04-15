require('./../../src/tool/test-signature')(__filename);

var configIni = require('./../../index');

describe('Object has basic sanity checks built-in', function () {
    it('md5', function () {
        expect(configIni.md5())
            .toBe('7b860a256fc4817af2443b2fc0a5267e');
    });
    it('version', function () {
        expect(configIni.version())
            .toBe('0.0.51');
    });
    it('encoding', function () {
        expect(configIni.encoding()).toBe('utf-8');
    });
    it('functions list', function () {
        expect(typeof configIni.md5).toBe('function');
        expect(typeof configIni.version).toBe('function');
        expect(typeof configIni.load).toBe('function');
        expect(typeof configIni.parse).toBe('function');
        expect(typeof configIni.stringify).toBe('function');
        expect(typeof configIni.encoding).toBe('function');
    });
});
