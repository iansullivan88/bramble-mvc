var caseInsensitiveRead = require('../../lib/helper/case-insensitive-read');

var testObject = {
    ParamEter1: 1,
    ParamEter2: 2
};

exports.getKey = {
    'correct key is found regardless of case': function (test) {
        test.strictEqual(caseInsensitiveRead.getKey(testObject, "parameter1"), "ParamEter1");
        test.strictEqual(caseInsensitiveRead.getKey(testObject, "parameter2"), "ParamEter2");
        test.strictEqual(caseInsensitiveRead.getKey(testObject, "parameter3"), undefined);
        test.done();
    },
    'correct value is found regardless of case': function (test) {
        test.strictEqual(caseInsensitiveRead.getValue(testObject, "parameter1"), 1);
        test.strictEqual(caseInsensitiveRead.getValue(testObject, "parameter2"), 2);
        test.strictEqual(caseInsensitiveRead.getValue(testObject, "parameter3"), undefined);
        test.done();
    },
};