'use strict';

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

if (!String.prototype.dequote) {
    String.prototype.dequote = function (q) {
        if (this.substr(0, 1) === q && this.substr((this.length-1), 1) === q) {
            return this.substr(1, (this.length-2)).trim();
        } else {
            return this;
        }
    };
}

var _jsesc           = require('jsesc'),
    _md5             = require('md5-file'),
    fs               = require('fs'),
    _classMd5        = _md5.sync(__filename),
    _defaultEncoding = 'utf-8',
    _ignore          = {
        ';': true,
        '#': true
    };

/**
 * Checks if line is "empty"
 * @param string line Input
 * @returns boolean
 */
function isEmpty(line) {
    return (line.length === 0 || _ignore[line.substr(0, 1)] === true);
}

/**
 * Trim, remove quotes, returns net value
 * @param string string Input value
 * @returns string
 */
function sanitize(string) {
    var out = [], val;
    for (var c=0; c<string.length; c++) {
        if (_ignore[string[c]]) {
            break;
        }
        out.push(string[c]);
    }
    val = out.join('').trim().dequote('\'').dequote('"');
    if ('' + parseFloat(val) === val) {
        return parseFloat(val);
    } else if ('' + parseInt(val) === val) {
        return parseInt(val);
    } else {
        return val;
    }
}

/**
 * Reads single non-empty line
 * @param string line
 * @returns {{type: string, key: string|null, value: null|int|float|string}}
 */
function readline(line) {
    line = line.trim();
    var out = {
            type: null, // section|item
            key: null,  // keyname
            value: null // value (without quotes if found)
        },
        sectionOpen  = line.indexOf('['),
        sectionClose = line.indexOf(']'),
        indexEquals  = line.indexOf('='),
        len          = line.length,
        multivalue   = line.indexOf('[]') > 0;

    if (multivalue === true) {
        out = {
            type: 'multi-value',
            key: line.substr(0, (indexEquals-1)),
            value: line.substr((indexEquals+1), len-(indexEquals+1))
        };
        if (out.key.indexOf('[]')>0) {
            out.key = out.key.split('[]')[0];
        }
    } else if (sectionOpen>-1 && (sectionClose-sectionOpen)>0) {
        out = {
            type: 'section',
            key: line.substr((sectionOpen+1), (sectionClose-sectionOpen)-1),
            value: ''
        };
    } else {
        out = {
            type: 'item',
            key: line.substr(0, (indexEquals-1)),
            value: line.substr((indexEquals+1), len-(indexEquals+1))
        };
    }
    if (out.key.length === 0) {
        out.type = 'empty';
    }

    out.value = sanitize(out.value);
    return out;
}

/**
 * Parses string input with sections
 * @param string input .ini string
 * @returns false|object
 */
function parse(input) {
    var _loop = 0, out = {}, details = {},
        currentSection = '',
        lines = input.split('\n');
    for (var i in lines) {
        if (isEmpty(lines[i])) {
            delete lines[i];
        } else {
            ++_loop;
            details = readline(lines[i]);
            if (details.key) {
                details.key = details.key.trim();
            }
            if (details.type === 'section') {
                currentSection = details.key;
                out[currentSection] = {};
            } else if (details.type === 'item') {
                out[currentSection][details.key] = details.value;
            } else if (details.type === 'multi-value') {
                if (!out[currentSection][details.key]) {
                    out[currentSection][details.key] = []; // create array
                }
                out[currentSection][details.key].push(details.value);
            } else if (details.type === 'empty') {
                _loop=_loop-1;
            } else {
                throw new Error('Invalid line data type type in line no. ' + i);
            }
            delete lines[i];
        }
    }
    return (_loop > 0) ? out : false;
}

var _jsescOpt = {
    quotes: 'double'
};

function number(input) {
    return (1*input === parseFloat(input)) || (1*input === parseInt(input));
}

function escapeQuotes(string, options) {
    if (number(string) === true) {
        return string;
    } else {
        options = (typeof options !== 'undefined')
            ? options
            : _jsescOpt;
        return '"' + _jsesc(string, options) + '"';
    }
}

/**
 * Turns object to .ini string
 * @param object ob
 * @param bool   escape
 * @returns string|false
 */
function stringify(ob, escape) {
    escape = (typeof escape !== 'boolean') ? false : escape;
    var _out = [], key, value;
    for (var k in ob) {
        if (typeof k === 'string' && typeof ob[k] === 'object') {
            _out.push('');
            _out.push('; Section: ' + k);
            _out.push('[' + k + ']');
            _out.push('');
            for (key in ob[k]) {
                value = ob[k][key];
                if (!value.push) {
                    if (escape === true) {
                        _out.push(key + ' = ' + escapeQuotes(value));
                    } else {
                        _out.push(key + ' = ' + value);
                    }
                } else {
                    for (var c in value) {
                        if (escape === true) {
                            _out.push(key + '[] = ' + escapeQuotes(value[c]));
                        } else {
                            _out.push(key + '[] = ' + value[c]);
                        }
                    }
                }
            }
            _out.push('');
        }
    }
    return _out.join('\n');
}

/**
 * NVL no value
 * @param mixed val      If not set
 * @param mixed fallback This one is returned
 * @returns mixed
 */
function nvl(val, fallback) {
    if (typeof val === 'undefined') {
        return fallback;
    } else {
        return val;
    }
}

/**
 * Parses .ini file
 * @param string file .ini file
 * @param string|undefined encoding Encoding
 * @returns boolean|object
 */
function load(file, encoding) {
    try {
        return parse(
            fs.readFileSync(
                file,
                nvl(encoding, getEncoding())
            ).toString()
        );
    } catch (err) {
        return false;
    }
}

/**
 * Getter/setter
 * @param string|undefined newValue New encoding
 * @returns {string}
 */
function getEncoding(newValue) {
    if (typeof newValue !== 'undefined' && typeof newValue === 'string') {
        _defaultEncoding = newValue;
    }
    return _defaultEncoding;
}

/**
 * Gets current version
 * @return string
 */
function version() {
    return require('./config').version;
}

/**
 * Objects MD5
 * @return string
 */
function md5() {
    return _classMd5;
}

module.exports = {
    md5: md5,                  // it is a simple object
    version: version,          // but some inspection is still needed
    encoding: getEncoding,
    load: load,
    parse: parse,
    escape: escapeQuotes,
    escapeOpt: _jsescOpt,
    stringify: stringify
};
