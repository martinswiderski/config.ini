config.ini
---

**your `.ini` files parser with some extras**


[![MIT License](https://raw.githubusercontent.com/martinswiderski/config.ini/master/mit-license.png)](LICENSE) [![Build Status](https://travis-ci.org/martinswiderski/config.ini.svg?branch=master)](https://travis-ci.org/martinswiderski/config.ini) [![npm version](https://badge.fury.io/js/config.ini.svg)](https://www.npmjs.com/package/config.ini)


### Version

Version|Published|By|URL
--- | --- | --- | ---
**0.0.51** | **2017-04-15** | `codebloke` | [npm](https://www.npmjs.com/package/config.ini)

### How to use it

#### Installation

```bash
npm install --save config.ini
```
#### In your code...

```javascript 1.8
var configIni = require('config.ini');
```

#### <a name="examples"></a>Examples

 * [Example .ini file format](#ini)
 * [Reading string](#string)
 * [Reading from a file](#file)
 * [Output to .ini string (you can save it into a file)](#output)
 * [I8N Support](#i8n)


#### <a name="ini"></a>Example format

For all examples below we are assuming following `.ini file` structure

```bash

# A comment
; This is a comment too 

[SectionOne]

key = "value"
integer = 1234
real = 3.14
string1 = "Case 1"
string2 = 'Case 2'
multivalue[] = "first"   # in-line comments
multivalue[] = 'second'  # are supported as well

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
[&laquo; back to list](#examples)


#### <a name="string"></a>Reading from a string

Reading config from an .ini `string` **with sections** <sub>(For section-less feature see: [#2](https://github.com/martinswiderski/config.ini/issues/2))</sub>

```javascript 1.8
var string = '',
    conf   = configIni.parse(string);

    /// (...)
    console.log(conf.SectionOne.integer);
    // 1234
    console.log(typeof conf.SectionOne.integer);
    // 'number'
    console.log(typeof conf.SectionTwo);
    // 'object'
    console.log(conf.SectionTwo.real);
    // 3.14
    /// (...)
```
[&laquo; back to list](#examples)

#### <a name="file"></a>Reading from a file

Reading config from a `file.ini`

```javascript 1.8
var conf = configIni.load('/yourFull/path/to/file.ini');

    /// (...)
    console.log(conf.SectionOne.integer);
    // 1234
    console.log(typeof conf.SectionOne.integer);
    // 'number'
    console.log(typeof conf.SectionTwo);
    // 'object'
    console.log(conf.SectionTwo.real);
    // 3.14
    /// (...)
```

[&laquo; back to list](#examples)

#### <a name="output"></a>Output to an .ini string

```javascript 1.8

    var objToIniString = {
        mysection: {
            key: "string",
            integer: 1234,
            real: 3.14
        }
    };

    console.log(configIni.stringify(objToIniString));
'
; Section: mysection
[mysection]

key = string
integer = 1234
real = 3.14
'

```

[&laquo; back to list](#examples)

#### <a name="i8n"></a>I8N Support

For the `.ini` file as follows:

```bash
[Japan]
miyamoto_musashi = "宮本武蔵"

[Germany]
gebhard_von_bluecher = "Gebhard-Leberecht von Blücher Fürst von Wahlstatt"

[ME]
salah_ad_din = "صلاحالدينيوسفبنأيوب"
```

we are getting back following object:

```javascript 1.8
console.log(
    {
        Japan: {
            miyamoto_musashi: '宮本武蔵'
        },
        Germany: {
            gebhard_von_bluecher: 'Gebhard-Leberecht von Blücher Fürst von Wahlstatt'
        },
        ME: {
            salah_ad_din: 'صلاحالدينيوسفبنأيوب'
        }
    }
);
```

[&laquo; back to list](#examples)

