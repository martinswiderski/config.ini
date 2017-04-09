config.ini
---

**your `.ini` files parser with some extras**


[![MIT License](https://raw.githubusercontent.com/martinswiderski/config.ini/master/mit-license.png)](LICENSE) [![Build Status](https://travis-ci.org/martinswiderski/config.ini.svg?branch=master)](https://travis-ci.org/martinswiderski/config.ini) [![npm version](https://badge.fury.io/js/config.ini.svg)](https://www.npmjs.com/package/config.ini)


### Version

Version|Published|By|URL
--- | --- | --- | ---
**0.0.2** | **2017-04-08** | `codebloke` | [npm](https://www.npmjs.com/package/config.ini)

### Use cases

#### Installation

```bash
npm install --save config,ini
```
then inside your code use:

```javascript 1.8
var configIni = require('config.ini');
```

#### Documentation

 * Example .ini file format
 * Reading string
 * Reading from a file
 * Output to .ini string (you can save it into a file)
 * I8N Support


Assuming following `.ini file` structure

```bash

# A comment
; This is a comment too 

[SectionOne]

key = "value"
integer = 1234
real = 3.14
string1 = "Case 1"
string2 = 'Case 2'
multivalue[] = "first"
multivalue[] = 'second'


; Section: SectionTwo
[SectionTwo]

key = new value
integer = 1234
real = 3.14
string1 = Case 1
string2 = Case 2
string3 = Case 3
multivalue[] = first
multivalue[] = second
multivalue[] = third

```

1. Reading config from an .ini `string` **with sections** <sub>(For section-less feature see: [#2](https://github.com/martinswiderski/config.ini/issues/2))</sub>

```javascript 1.8
var string = '',
    conf   = configIni.parse(string);
```
2. Reading config from a `file.ini`

```javascript 1.8
var conf = configIni.load(file);
```