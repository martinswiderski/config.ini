'use strict';

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

var nvl = require('./nvl'),
    Base64 = require('./base64'),
    Cryptr = require('cryptr');

/**
 * Wraps object to string
 * @param {Object}      string    Object to be wrapped
 * @param {null|string} secretKey Encryption secret key
 * @returns {string}
 */
module.exports = function wrap(string, secretKey) {
    var fallback = nvl(process.env['CONFIG_INI_SECRET_KEY'], 'Es irrt der Mensch so lang er strebt'),
        cryptr = new Cryptr(nvl(secretKey, fallback));
    return Base64.encode(cryptr.encrypt(string));
};

