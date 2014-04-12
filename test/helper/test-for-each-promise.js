var forEachPromise = require('../../lib/helper/for-each-promise'),
    Q = require('q');

exports.forEachPromise = {
    'test all items get called sequentially': function (test) {
        var completedFunctions = 0;
        forEachPromise([1, 2, 3], function(number) {
            test.strictEqual(number, ++completedFunctions);
            // even with the delay, 2 should get completed first
            if (number === 2) {
                return Q.delay(50);
            }
        }).done(function() {
            test.strictEqual(completedFunctions, 3);
            test.done();
        });
    },
    'test that errors are propagated': function (test) {
        var completedFunctions = 0;
        var error = new Error("Test Error");
        forEachPromise([1, 2, 3], function(number) {
            completedFunctions++;
            if (number === 2) {
                throw error;
            }
        }).done(null, function(e) {
            test.strictEqual(e, error);
            test.done();
        });
    },
    'test that the array can be added to during iteration': function (test) {
        var completedFunctions = 0;
        var array = [1, 2, 3];
        forEachPromise(array, function(number) {
            completedFunctions++;
            if (number === 2) {
                array.push(4);
            }
        }).done(function() {
            test.strictEqual(completedFunctions, 4);
            test.done();
        });
    }
};