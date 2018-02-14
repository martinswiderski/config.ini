require('./../../src/sign-test')(__filename);

var udf, nvl = require('./../../src/nvl');

describe('nvl', function () {

    it('values passed', function () {
        expect(typeof nvl({ obj: true})).toBe('object');
        expect(JSON.stringify(nvl({obj: true}))).toBe('{"obj":true}');
        expect(typeof nvl(1234)).toBe('number');
        expect(nvl(1234)).toBe(1234);
    });
    it('no value', function () {
        expect(typeof nvl(udf)).not.toBe('undefined');
        expect(nvl(udf)).toBe(null);
    });
    it('no value + fallback', function () {
        expect(typeof nvl(udf, 'fallback')).not.toBe('undefined');
        expect(nvl(udf, 'fallback')).toBe('fallback');
    });
});
