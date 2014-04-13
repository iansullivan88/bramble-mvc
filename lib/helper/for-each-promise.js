var Q = require('q');

/**
* Serially processes an array of values using the supplied callback. The callback
* may return a promise in which case, the next element will only be processed
* once the promise is resolved.
*
* @method forEachPromise
* @param array {Array} Array of values to process
* @param callback {Function} callback to call on each element of the array
* @return {Promise} Promise which is resolved on complete iteration of the array
*/
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