function normalizeSplitPath(splitPath) {
    // Trim array elements containing empty strings
    if (splitPath.length && splitPath[0] === "") {
        splitPath.splice(0, 1);
    }
    
    if (splitPath.length && splitPath[splitPath.length - 1] === "") {
        splitPath.splice(splitPath.length - 1, 1);
    }
    
    return splitPath;
}

function getParameters(route, request, defaults) {
    if (request.length > route.length) {
        return null;
    }
    
    var parameters = {};
    for (var i=0;i<route.length;i++) {
        if (route[i].indexOf(":") === 0) {
           // is a variable
           var variableName = route[i].substring(1);
           var requestValue = request[i];
           if (requestValue) {
               parameters[variableName] = requestValue;
           } else {
               if (!defaults.hasOwnProperty(variableName)) {
                   return null;
               }
               parameters[variableName] = defaults[variableName];
           }
        } else {
            // is fixed
            if (request[i] !== route[i]) {
                return null;
            }
        }
    }
    
    for(var key in defaults) {
        if (defaults.hasOwnProperty(key) && !parameters.hasOwnProperty(key)) {
            parameters[key] = defaults[key];
        }
    }
    
    return parameters;
}


exports.matchRoute = function(routes, requestPath) {
	var splitRequest = normalizeSplitPath(requestPath.split('/'));
    for(var i=0;i<routes.length;i++) {
        var route = routes[i];
        var splitRoute = normalizeSplitPath(route.path.split('/'));
        var parameters = getParameters(splitRoute, splitRequest, route.defaults);
        if (parameters) {
            return {
                route:route,
                parameters:parameters
            };
        }
    }
	
	return undefined;
};


