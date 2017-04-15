require('./../../src/tool/test-signature')(__filename);

var configIni = require('./../../index'),
    file      = __dirname + '/../props/config.ini',
    conf      = configIni.load(file),
    restored  = configIni.parse(configIni.stringify(conf));

describe('Reads object', function () {
    it('from .ini file with sections', function () {
        expect(typeof conf).toBe('object');
        expect(typeof conf.SectionOne).toBe('object');
    });
    it('outputs into a string from INI', function () {
        expect(typeof configIni.stringify(conf)).toBe('string');
        expect(configIni.stringify(conf))
            .toBe([
                '',
                '; Section: SectionOne',
                '[SectionOne]',
                '',
                'key = value',
                'integer = 1234',
                'real = 3.14',
                'string1 = Case 1',
                'string2 = Case 2',
                'multivalue[] = first',
                'multivalue[] = second',
                '',
                '',
                '; Section: SectionTwo',
                '[SectionTwo]',
                '',
                'key = new value',
                'integer = 1234',
                'real = 3.14',
                'string1 = Case 1',
                'string2 = Case 2',
                'string3 = Case 3',
                'multivalue[] = first',
                'multivalue[] = second',
                'multivalue[] = third',
                ''
            ].join('\n'));
    });
    it('Data in JSON is identical', function () {
        expect(JSON.stringify(restored)).toBe(JSON.stringify(conf));
    });

    var objToIniString = {
            mysection: {
                key: 'Jake\'s favourite book is "Gone with the wind"',
                integer: 1234,
                real: 3.14
            }
        },
        fromFileIni = configIni.load(__dirname + '/../props/escaped.ini');

    it('outputs into a string from Javascript object', function () {
        expect(typeof configIni.stringify(objToIniString)).toBe('string');
        expect(configIni.stringify(objToIniString)).toBe([
            '',
            '; Section: mysection',
            '[mysection]',
            '',
            'key = Jake\'s favourite book is "Gone with the wind"',
            'integer = 1234',
            'real = 3.14',
            ''
        ].join('\n'));
    });

    it('outputs into a string from Javascript object w. quote escape', function () {
        expect(typeof configIni.stringify(objToIniString, true)).toBe('string');
        expect(configIni.stringify(objToIniString, true)).toBe([
            '',
            '; Section: mysection',
            '[mysection]',
            '',
            'key = "Jake\'s favourite book is \\\"Gone with the wind\\\"\"',
            'integer = 1234',
            'real = 3.14',
            ''
        ].join('\n'));
    });

    it('outputs read from file to string w. quote escape', function () {
        expect(typeof configIni.stringify(fromFileIni, true)).toBe('string');
        expect(configIni.stringify(fromFileIni, true)).toBe([
            '',
            '; Section: mysection',
            '[mysection]',
            '',
            'key = "Jake\'s favourite book is \\\"Gone with the wind\\\"\"',
            'integer = 1234',
            'real = 3.14',
            ''
        ].join('\n'));
    });
});


