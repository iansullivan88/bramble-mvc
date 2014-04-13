var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

/**
* The method calls a function with named arguments defined in an object.
* Adapted from http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
*
* @method executeFunctionWithNamedArguments
* @param func {Function} The function to call
* @param thisValue {Object} The value of 'this' when executing the function
* @param namedArguments {Object} Name value pairs of arguments to bind to the function parameters
* @return Returns the supplied function's return value
*/
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