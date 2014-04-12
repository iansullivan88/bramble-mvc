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
            processRequest('/path', [blogRoute], {controller: function() {}});
        });
        test.done();
    },
    'exception is thrown if no controller matches': function (test) {
        test.throws(function() {
            processRequest('/', [defaultRoute], {});
        });
        test.done();
    },
    'exception is thrown if no action matches': function (test) {
        test.throws(function() {
            processRequest('/', [defaultRoute], {home:function() {}});
        });
        test.done();
    },
    'request url correctly processed': function (test) {
        var viewModel = {};
        processRequest('/news/test', [blogRoute, defaultRoute], {test:function(req, res) {
            this.index = function() {
                res.view(viewModel);
            };
        }}, function(controllerName, viewName, model, resolveUrl) {
            test.strictEqual(controllerName, "test");
            test.strictEqual(viewName, "index");
            test.strictEqual(model, viewModel);
            
            return "viewcontent";
        }, function(serverPath, fileName, content) {
            test.strictEqual(serverPath, "/news/test");
            test.strictEqual(fileName, "index.html");
            test.strictEqual(content, "viewcontent");
        }).done(test.done);
    },
};