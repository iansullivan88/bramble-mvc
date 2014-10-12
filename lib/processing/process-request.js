var routeMatcher = require('../routing/route-matcher'),
    responseModule = require('../routing/response'),
    util = require('util'),
    debug = require('debug')('bramble');

module.exports = function(requestUrl, outputUrl, routes, viewRenderer, fileWriter, resolveUrl) {
    debug("Processing path '%s'", requestUrl);
    
    // Match the correct route
    var routeMatch = routeMatcher.matchRoute(routes, requestUrl);
    if (!routeMatch) {
        throw new Error(util.format("Could not match route for path '%s'", requestUrl));
    }
    
    debug("Matched path '%s'", routeMatch.route.path);

    // Create request and response objects
    var request = Object.create(null, {path:{value:requestUrl}, parameters:{value:routeMatch.parameters}});
    var response = responseModule.createResponse();
    var handler = routeMatch.route.handler;
    
    debug("Executing with parameters: '%j'", request.parameters);
    handler.call(null, request, response);
    
    // Process the response and write the view to the output folder
    return response.responseOptions.then(function(viewOptions) {
        if (!viewOptions.viewName) {
            throw new Error("View not specified in handler");
        }
        debug("Processing view: %s", viewOptions.viewName);
        var responseContent = viewRenderer(viewOptions.viewName, viewOptions.model || {}, resolveUrl);
        fileWriter(outputUrl, "index.html", responseContent);
        debug("");
    });
    
};


