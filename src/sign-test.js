'use strict';

if (!Array.prototype.last) Array.prototype.last = function() {
    return this[this.length - 1];
};

const color = require('bash-color');

(function(){
    module.exports = function (testfile, cnsl=null) {
        (cnsl==null ? console : cnsl).log(
            'MD5: ' +
            color.wrap(require('md5-file').sync(testfile), color.colors.BLUE, color.styles.bold) +
            ' File: ' +
            color.wrap(testfile.split(testfile.indexOf('/')<0 ? '\\' : '/').last(), color.colors.PURPLE, color.styles.bold)
        );
        return;
    };

})();
