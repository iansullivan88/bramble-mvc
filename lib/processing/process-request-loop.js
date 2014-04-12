var forEachPromise = require('../helper/for-each-promise'),
    pathHelper = require('../helper/path-helper');
    

module.exports = function(processRequest, requestUrls, routes, namedControllers, viewRenderer, fileWriter) {
    var processedUrls = {},
        urlsToProcess = requestUrls.slice(0);
    
    return forEachPromise(urlsToProcess, function(requestUrl) {
        if (processedUrls.hasOwnProperty(requestUrl)) {
            return;
        }
        processedUrls[requestUrl] = true;
        return processRequest(requestUrl, routes, namedControllers, viewRenderer, fileWriter, function(newRequest) {
            var rootRelativePath = pathHelper.createRootRelativePath(requestUrl, newRequest);
            urlsToProcess.push(rootRelativePath);
            return rootRelativePath;
        });
        
    });
    
};