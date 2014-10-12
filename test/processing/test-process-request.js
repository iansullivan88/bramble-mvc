var processRequest = require('../../lib/processing/process-request');

var defaultRoute = {
    path: ":controller/:action/:id",
    defaults: {
        controller:"home",
        action:"index",
        id:null
    }
};

var blogRoute = {
    path: "news/:controller/:action",
    defaults: {
        controller:"news",
        action:"index"
    }
};

exports.processRequest = {
    'exception is thrown if no route matches': function (test) {
        test.throws(function() {
            processRequest('/path', '/path', [blogRoute], {controller: function() {}});
        });
        test.done();
    },
    'exception is thrown if no controller matches': function (test) {
        test.throws(function() {
            processRequest('/', '/', [defaultRoute], {});
        });
        test.done();
    },
    'exception is thrown if no action matches': function (test) {
        test.throws(function() {
            processRequest('/', '/', [defaultRoute], {home:function() {}});
        });
        test.done();
    },
    'request url correctly processed': function (test) {
        var expectedViewModel = {},
            expectedViewName = "something",
            expectedViewContent = "content";
        processRequest('/a/b', '/a/b', [{
            path: "a/:variable1/:variableWithDefault",
            defaults: {variableWithDefault: "defaultValue"}, 
            handler:function(req, res) {
                test.strictEqual(req.parameters.variable1, "b");
                test.strictEqual(req.parameters.variableWithDefault, "defaultValue");
                res.view(expectedViewName, expectedViewModel);
            }
        }], function(viewName, model, resolveUrl) {
            test.strictEqual(viewName, expectedViewName);
            test.strictEqual(model, expectedViewModel);
            return expectedViewContent;
        }, function(serverPath, fileName, content) {
            test.strictEqual(serverPath, "/a/b");
            test.strictEqual(fileName, "index.html");
            test.strictEqual(content, expectedViewContent);
        }).done(test.done);
    },
};