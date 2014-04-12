var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

// Adapted from http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
exports.executeFunctionWithNamedArguments = function(func, thisValue, namedArguments) {
    var functionString = func.toString().replace(STRIP_COMMENTS, '');
    var argumentNames = functionString.slice(functionString.indexOf('(')+1, functionString.indexOf(')')).match(/([^\s,]+)/g);
    if (argumentNames === null) {
        argumentNames = [];
    }
    
    var functionArguments = argumentNames.map(function(argumentName) {
       return namedArguments[argumentName];
    });
    
    return func.apply(thisValue, functionArguments);
};