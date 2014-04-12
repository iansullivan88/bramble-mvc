var Q = require('q');

module.exports = function(array, callback) {
    var complete = Q.defer();
    
    function handleNextItem() {
        if (complete.promise.isFulfilled()) {
            return;
        }
        
        var nextItem = array.shift();
        if (nextItem) {
            Q.fcall(callback, nextItem).then(handleNextItem, complete.reject);
        } else {
            complete.resolve();
        }
    }
    
    handleNextItem();
    return complete.promise;
};