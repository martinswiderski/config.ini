require('./../../src/sign-test')(__filename);


if (!String.prototype.contains){
    String.prototype.contains = function(str) {
        return ''+this.indexOf(str) != -1;
    };
}

function MockConsole () {
    var _string = '';
    this.captured = function() {
        return _string;
    };
    this.log = function(input) {
        return _string = input;
    }
}

let mockConsole = new MockConsole();

require('./../../src/sign-test')(__dirname+'/nvl-spec.js', mockConsole);

describe('console can be injected', function () {
    it('string contains a valid MD5', function () {
        expect(mockConsole.captured().contains('e0d52f79a510ff64e465e2a595ba2468')).toBe(true);
    });
});


