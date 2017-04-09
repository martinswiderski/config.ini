'use strict';

(function(){
    module.exports = function (input) {
        return new (require('./src/parser'));
    };
})();
