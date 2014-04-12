var fs = require('fs'),
    path = require('path'),
    pathHelper = require('../helper/path-helper'),
    mkdirp = require('mkdirp');

exports.createOutputFile = function(rootPath, serverPath, fileName, content) {
    var folder = pathHelper.createFilePathForRootRelativePath(rootPath, serverPath);
    if (!fs.existsSync(folder)) {
        mkdirp.sync(folder);
    }
    var filePath = path.join(folder, fileName);
    fs.writeFileSync(filePath, content);
};