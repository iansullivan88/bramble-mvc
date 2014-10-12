var forEachPromise = require('../helper/for-each-promise'),
    pathHelper = require('../helper/path-helper');
    
module.exports = function(processRequest, requestUrls, redirects, routes, viewRenderer, fileWriter) {
    var processedUrls = {},
        urlsToProcess = requestUrls.slice(0);
    
    return forEachPromise(urlsToProcess, function(urlToProcess) {
        if (processedUrls.hasOwnProperty(urlToProcess)) {
            return;
        }
        processedUrls[urlToProcess] = true;
        
        var redirectedUrl = redirects[urlToProcess];
        if (redirectedUrl) {
            processedUrls[redirectedUrl] = true;
        }
        
        var outputUrl = redirectedUrl || urlToProcess;
        return processRequest(outputUrl, urlToProcess, routes, viewRenderer, fileWriter, function(newRequest) {
            var rootRelativePath = pathHelper.createRootRelativePath(urlToProcess, newRequest);
            urlsToProcess.push(rootRelativePath);
            return rootRelativePath;
        });
        
    });
};