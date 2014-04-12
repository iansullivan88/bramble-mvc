var Q = require('q');

function Response() {}

Response.prototype.error = function(error) {
    this._responseOptionsDeferred.reject(error);
};
Response.prototype.view = function(model, viewName) {
    this._responseOptionsDeferred.resolve({
       model:model,
       viewName:viewName
    });
};

exports.createResponse = function() {
    var optionsDeferred = Q.defer();
    return Object.create(Response.prototype, {
        responseOptions:{value:optionsDeferred.promise},
        _responseOptionsDeferred:{value:optionsDeferred}
    });
};