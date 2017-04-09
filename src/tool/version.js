'use strict';

var fs = require('fs'),
    rebuildVersion = process.argv[2] && process.argv[2] === '--update' ? true : false,
    config = require('./../config');

function updateVersion(pck, read, ver, date, rebuild, cnf) {
    var err = [];
    if (rebuild !== true) {
        return false;
    } else {
        var pckg = require(pck),
            readme = fs.readFileSync(read, 'utf8').toString().split(('\n'));
        if (!pckg.version) {
            err.push('Package info not found');
        } else {
            pckg.version = ver;
            fs.writeFileSync(pck, JSON.stringify(pckg, null, 2));
        }
        if (readme.length < 5) {
            err.push('Readme file too short');
        } else {
            for (var l in readme) {
                if (readme[l].indexOf('** | **')> -1)  readme[l] = '**' + ver + '** | **' + date + '** | `codebloke` | [npm](https://www.npmjs.com/package/' + cnf.name +')';
            }
            fs.writeFileSync(read, readme.join('\n'), 'utf8');
        }
        return (err.length === 0) ? true : err;
    }
}

updateVersion(
    __dirname + '/../../' + config.package,
    __dirname + '/../../' + config.readme,
    config.version,
    config.published,
    rebuildVersion,
    config
);

