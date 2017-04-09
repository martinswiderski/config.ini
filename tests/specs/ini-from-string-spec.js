require('./../../src/tool/test-signature')(__filename);

var configIni = require('./../../index'),
    string    = '';

string = [
    '[SectionOne]',
    '',
    'key = value',
    'integer = 1234',
    'real = 3.14',
    'string1 = \'Case 1\'',
    'string2 = "Case 2"',
    'multivalue[] = first',
    'multivalue[] = second',
    '',
    '[SectionTwo]',
    '',
    '; comment line',
    'key = new value # after hash comment and not a value',
    'integer = 1234  # after hash comment and not a value',
    'real = 3.14     # after hash comment and not a value',
    'string1 = \'Case 1\'     # after hash comment and not a value',
    'string2 = "Case 2"     # after hash comment and not a value',
    'string3 = \'Case 3\'     ; after semicolon it\'s comment',
    'multivalue[] = first   # after hash comment and not a value',
    'multivalue[] = second  # after hash comment and not a value',
    'multivalue[] = third   ; after semicolon comment and not a value',
    ''
].join('\n');

describe('Reads object from string', function () {
    it('correctly formatted .ini content', function () {
        expect(typeof configIni.parse(string)).toBe('object');
        expect(typeof configIni.parse(string).SectionOne).toBe('object');
        expect(configIni.parse(string).SectionOne.integer).toBe(1234);
        expect(typeof configIni.parse(string).SectionOne.integer).toBe('number');
        expect(typeof configIni.parse(string).SectionTwo).toBe('object');
        expect(configIni.parse(string).SectionTwo.real).toBe(3.14);
        expect(typeof configIni.parse(string).SectionTwo.real).toBe('number');
    });
    it('incorrectly formatted .ini content', function () {
        expect(configIni.parse('BSS')).toBe(false);
        expect(typeof configIni.parse('BSS')).toBe('boolean');
    });
});


