'use strict';

var nvl = require('./nvl'),
    pck = require('./../package');

module.exports = {
    encrypt_key: nvl(process.env['CONFIG_INI_ENCRYPT_KEY'], 'Es irrt der Mensch so lang er strebt'),
    package: pck,
    name: pck.name,
    version: pck.version,
    published: '2018-02-15',
    readme: 'README.md',
    package: 'package.json'
};
