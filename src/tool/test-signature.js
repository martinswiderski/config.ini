'use strict';

var md5File = require('md5-file'),
    _md5, _last, _file, _sep = '/',
    color   = require('bash-color');

(function(){
    module.exports = function (testfile) {
        _sep  = (testfile.indexOf(_sep) < 0) ? '\\' : _sep;
        _file = testfile.split(_sep);
        _last = _file[(_file.length - 1)];
        console.log(
            'MD5: ' +
            color.wrap(md5File.sync(testfile), color.colors.BLUE, color.styles.bold) +
            ' File: ' +
            color.wrap(_last, color.colors.PURPLE, color.styles.bold)
        );
        return;
    };

})();
