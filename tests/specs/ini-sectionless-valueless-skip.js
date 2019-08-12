require('./../../src/tool/test-signature')(__filename);

var config      = require('./../../index'),
    configMySQL = config.load(__dirname + '/../props/my.sectionless.conf'),
    expected = {
      "count": 4,
      "value": {
        "this_key_is_true": true,
        "value_one": 1,
        "value_test_1": "Text 1",
        "value_text_2": "Text 2"
      }
    };


console.log(configMySQL);

describe('Reads sectionless into object', function () {
    it('values are available in main scope', function () {
        expect(configMySQL.this_key_is_true).toBe(true);
        expect(configMySQL.value_one).toBe(1);
        expect(configMySQL.value_test_1).toBe("Text 1");
        expect(configMySQL.value_test_2).toBe("Text 2");
    });
});
