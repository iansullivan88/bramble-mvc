var routeMatcher = require('../routing/route-matcher'),
    caseInsensitiveRead = require('../helper/case-insensitive-read'),
    functionCaller = require('../helper/function-caller'),
    responseModule = require('../routing/response'),
    util = require('util'),
    debug = require('debug')('bramble');

module.exports = function(requestUrl, routes, namedControllers, viewRenderer, fileWriter, resolveUrl) {
    debug("Processing path '%s'", requestUrl);
    
    // Match the correct route
    var routeMatch = routeMatcher.matchRoute(routes, requestUrl);
    if (!routeMatch) {
        throw new Error(util.format("Could not match route for path '%s'", requestUrl));
    } else if (!routeMatch.parameters.controller || !routeMatch.parameters.action) {
        throw new Error(util.format("The url '%s' matched '%s' but does not have values for controller and action", requestUrl, routeMatch.route.path));
    }
    debug("Matched path '%s'", routeMatch.route.path);
    
    // Get the correct controller constructor
    var controllerName = caseInsensitiveRead.getKey(namedControllers, routeMatch.parameters.controller);
    if (!controllerName) {
        throw new Error(util.format("Could not find controller named '%s'. Possible controller names are: '%j'", routeMatch.parameters.controller, Object.keys(namedControllers)));
    }

    // Create request and response objects
    var request = Object.create(null, {path:{value:requestUrl}});
    var response = responseModule.createResponse();
   
    // Instantiate the controller
    var controllerConstructor = namedControllers[controllerName];
    var controller = Object.create(controllerConstructor);
    controllerConstructor.call(controller, request, response);
    
    // Get and invoke the correct action
    var actionName = caseInsensitiveRead.getKey(controller, routeMatch.parameters.action);
    if (!actionName) {
        throw new Error(util.format("Controller '%s' does not have action '%s'", controllerName, routeMatch.parameters.action));
    }
    
    debug("Executing controller: '%s' with action '%s'", controllerName, actionName);
    
    functionCaller.executeFunctionWithNamedArguments(controller[actionName], controller, routeMatch.parameters);
    
    // Process the response and write the view to the output folder
    return response.responseOptions.then(function(viewOptions) {
        viewOptions = viewOptions || {};
        viewOptions.viewName = viewOptions.viewName || actionName;
        debug("Processing view '%s'", viewOptions.viewName);
        var responseContent = viewRenderer(controllerName, viewOptions.viewName, viewOptions.model || {}, resolveUrl);
        fileWriter(requestUrl, "index.html", responseContent);
        debug("");
    });
    
};


