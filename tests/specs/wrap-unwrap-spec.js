require('./../../src/sign-test')(__filename);

var wrap = require('./../../src/wrap'),
    unwrap = require('./../../src/unwrap'),
    contents = 'This is test text';

process.env['CONFIG_INI_SECRET_KEY'] = 'ABCD12345XX';

describe('wraps strings', function () {
    it('producing strings', function () {
        expect(wrap(contents)).toBe('OWZhZjA2MzVkYjI0NjgwMjY1MGI3MWQ4MWEwOWUzMjcyODFmOGNjNTUxYjE4NmEzYTA0NmI1NDgyZDcyZTFlZQ==');
        expect(wrap(contents).length).toBe(88);
    });
});

var wrapped = 'OWZhZjA2MzVkYjI0NjgwMjY1MGI3MWQ4MWEwOWUzMjcyODFmOGNjNTUxYjE4NmEzYTA0NmI1NDgyZDcyZTFlZQ==',
    unwrapped = unwrap(wrapped);

describe('unwraps strings', function () {
    it('producing strings', function () {
        expect(unwrap(wrap(contents))).toBe(contents);
        expect(unwrapped).toBe(contents);
    });
    it('handles errors returning false', function () {
        expect(unwrap('BJSBNJS')).toBe(false);
    });
});

