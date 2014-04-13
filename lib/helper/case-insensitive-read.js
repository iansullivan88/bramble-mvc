/**
* Returns the value of an object's property using a case insensitive name
*
* @method getValue
* @param source {Object} The object to retrieve the value from
* @param propertyName {String} The case insensitive property name
* @return {String} Object value
*/
exports.getValue = function(source, propertyName) {
    var key = exports.getKey(source, propertyName);
    if (key) {
        return source[key];
    }
};

/**
* Gets the name of an object's key given a case insensitive version of the key. Eg 'WrOnGCASE' might return 'wrongCase'
* if the key 'wongCase' exists
*
* @method getKey
* @param source {Object} The object to test
* @param propertyName {String} The case insensitive name of the key
* @return {String} Case sensitive key
*/
exports.getKey = function(source, propertyName) {
    var lowerCaseProperty = propertyName.toLowerCase();
    var keys = Object.keys(source);
    for(var i=0;i<keys.length;i++) {
        var key = keys[i];
        if (lowerCaseProperty === key.toLowerCase()) {
            return key;
        }
    }
};