exports.getValue = function(source, propertyName) {
    var key = exports.getKey(source, propertyName);
    if (key) {
        return source[key];
    }
};

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