require('./../../src/sign-test')(__filename);

var Base64 = require('./../../src/base64');

describe('native Base64', function () {
    it('is', function () {
        expect(Base64.isValid('宮本 武蔵')).toBe(false);
        expect(Base64.isValid('ABC123')).toBe(false);
        expect(Base64.isValid('5a6u5pysIOatpuiUtQ==')).toBe(true);
        expect(Base64.isValid('QUJDMTIz')).toBe(true);
        expect(Base64.isValid({one: 1})).toBe(false);
    });
    it('encode', function () {
        expect(Base64.encode('宮本 武蔵')).toBe('5a6u5pysIOatpuiUtQ==');
        expect(Base64.encode('ABC123')).toBe('QUJDMTIz');
    });
    it('decode', function () {
        expect(Base64.decode('5a6u5pysIOatpuiUtQ==')).toBe('宮本 武蔵');
        expect(Base64.decode('QUJDMTIz')).toBe('ABC123');
    });
});
