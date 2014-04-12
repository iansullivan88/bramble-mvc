var processRequestLoop = require('../../lib/processing/process-request-loop');

exports.createResponse = {
    'all urls are processed': function (test) {
        var processedUrls = [];
        var urlsToProcess = ["/test/", "/", "/test2"];
        test.expect(1);
        processRequestLoop(function(url) {
            processedUrls.push(url);
        }, urlsToProcess).then(function() {
            test.deepEqual(processedUrls, urlsToProcess);
            test.done();
        });
    },
    'resolved urls are added relative to current url': function (test) {
        var processedUrls = 0;
        var urlsToProcess = ["/test1/test2"];
        test.expect(2);
        processRequestLoop(function(url, _1, _2, _3, _4, resolveUrl) {
            if (processedUrls === 0) {
                resolveUrl("test3");
            } else if (processedUrls === 1) {
                test.strictEqual(url, "/test1/test3");
                resolveUrl("/test4");
            } else if (processedUrls === 2) {
                test.strictEqual(url, "/test4");
            }
            processedUrls++;
        }, urlsToProcess).then(function() {
            test.done();
        });
    },
    'duplicate urls are not processed': function (test) {
        var processedUrls = [];
        var urlsToProcess = ["/test1"];
        processRequestLoop(function(url, _1, _2, _3, _4, resolveUrl) {

            if (processedUrls.length === 0) {
                resolveUrl("/test2");
            } else if (processedUrls.length === 1) {
                resolveUrl("test1");
            } else {
                test.ok(false, "Only two urls should be processed");
            }
            processedUrls.push(url);
        }, urlsToProcess).then(function() {
            test.done();
        });
    },
};