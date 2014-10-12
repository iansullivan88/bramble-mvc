var responseModule = require('../../lib/routing/response');

exports.createResponse = {
    'response is correctly created': function (test) {
        var response = responseModule.createResponse();
        test.strictEqual(typeof(response.view), "function");
        test.strictEqual(typeof(response.error), "function");
        test.strictEqual(response.responseOptions.constructor.name, "Promise");
        test.done();
    },
    'view function resolves the options promise': function (test) {
        var response = responseModule.createResponse();
        var model = {};
        response.responseOptions.done(function(viewOptions) {
            test.strictEqual(viewOptions.viewName, "test");
            test.strictEqual(viewOptions.model, model);
            test.done();
        });
        response.view("test", model);
    },
    'error function rejects the options promise': function (test) {
        var response = responseModule.createResponse();
        var model = {};
        response.responseOptions.done(null, function() {
            test.done();
        });
        response.error();
    },
};