var functionCaller = require("../../lib/helper/function-caller");

// Test function that simply returns the value of this and the passed in parameters
function testFunction(/*comment*/parameter1, /*comment2*/anotherParameter) {
    return [this + ""].concat(Array.prototype.slice.call(arguments, 0));
}
var valueOfThis = "thisvalue";

exports.getParameters = {
'supplied function is called with parameters and this': function (test) {
    var temp = functionCaller.executeFunctionWithNamedArguments(testFunction, valueOfThis, {parameter1:"a", anotherParameter:"b"});
    
    test.deepEqual(
            functionCaller.executeFunctionWithNamedArguments(testFunction, valueOfThis, {parameter1:"a", anotherParameter:"b"}),
            [valueOfThis, "a", "b"]);
    test.done();},
    
'missing parameters are undefined': function (test) {
    var temp = functionCaller.executeFunctionWithNamedArguments(testFunction, valueOfThis, {parameter1:"a", anotherParameter:"b"});
    
    test.deepEqual(
            functionCaller.executeFunctionWithNamedArguments(testFunction, valueOfThis, {anotherParameter:"b"}),
            [valueOfThis, undefined, "b"]);
    test.done();},
 };