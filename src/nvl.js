'use strict';

/**
 * NVL no value
 * @param mixed val      If not set
 * @param mixed fallback This one is returned
 * @returns mixed
 */
module.exports = function nvl(val, fallback=null) {
    return typeof val === 'undefined' ? fallback : val;
};