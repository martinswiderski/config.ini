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

var _i = 0,
    _defaultEncoding = 'utf-8',
    _ignore = {
        ';': true,
        '#': true
    },
    fs = require('fs');

function isEmpty(line) {
    return (line.length === 0 || _ignore[line.substr(0, 1)] === true);
}

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

function parseString(input) {
    var out = {}, details = {},
        currentSection = '',
        lines = input.split('\n');
    for (var i in lines) {
        if (isEmpty(lines[i])) {
            delete lines[i];
        } else {
            details = readline(lines[i]);
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
                console.log(details);
            } else {
                throw new Error('Invalid line data type type in line no. ' + i);
            }
            delete lines[i];
        }
    }
    return out;
}

function Parser(id, parent) {

    var _store = {},
        _id = id,
        _parent = parent,
        _errors = [];

    this.encoding = function() {
        return _defaultEncoding;
    };

    this.new = function() {
        return new Parser(++_i, _id); // creates child
    };

    this.id = function() {
        return _id;
    };

    this.parent = function() {
        return _parent;
    };

    this.errors = function() {
        return JSON.parse(JSON.stringify(_errors));
    };

    this.parse = function(string) {
        return _store = parseString(string);
    };

    this.load = function(file) {
        try {
            return _store = parseString(
                fs.readFileSync(
                    file,
                    this.encoding()
                )
            );
        } catch (err) {
            _errors.push(err.message);
            return {};
        }
    };

    this.stringify = function(indent, quote) {
    };

    /**
     *
     * @param object|undefined ob Latter reads self-storage
     * @returns string
     */
    this.toJSON = function(ob) {
        ob = (typeof ob === 'undefined') ? _store : ob;
        var _out = '';
        if (typeof ob !== 'object') {
            return '{}';
        } else {
            _out = JSON.stringify(ob);
            return (_out.substr(0, 1) === '{' && _out.substr((_out.length-1), 1) === '}')
                ? _out : '{}';
        }
    };

}

module.exports = new Parser;