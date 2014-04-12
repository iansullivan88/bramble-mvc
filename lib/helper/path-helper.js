var url = require('url'),
    path = require('path');

exports.createRootRelativePath = function(from, to) {
    var rootPath = url.resolve(from, to);
    
    // strip trailing slashes
    if (rootPath.length > 1 && rootPath.charAt(rootPath.length - 1) === "/") {
        rootPath = rootPath.substring(0, rootPath.length - 1);
    }
    
    return rootPath;
};

exports.createFilePathForRootRelativePath = function(fileRoot, rootRelativePath) {
    return path.join(fileRoot, rootRelativePath.replace(/\//g, path.sep));
};