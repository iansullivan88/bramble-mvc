var fs = require('fs'),
    path = require('path'),
    fileWriter = require('./lib/view/file-writer'),
    pathHelper = require('./lib/helper/path-helper'),
    processRequestLoop = require('./lib/processing/process-request-loop'),
    processRequest = require('./lib/processing/process-request'),
    routes = [],
    redirects = {},
    urls = ['/'],
    viewRenderer;

exports.get = function(path, options, handler) {
    if (!handler) {
       handler = options;
       options = {};
    }
    options = options || {};
    routes.push({
        path: path,
        defaults: options.defaults,
        handler: handler
    });
};

exports.redirect = function(from, to) {
    // Normalise paths
    from = pathHelper.createRootRelativePath('/', from);
    to = pathHelper.createRootRelativePath('/', to);
    redirects[from] = to;
};

exports.initialPaths = function(paths) {
    urls = paths;
};

exports.viewRenderer = function(viewRenderer) {
    viewRenderer = viewRenderer;
};

exports.build = function(viewPath, outputPath, callback) {
    return processRequestLoop(
        processRequest,
        urls,
        redirects,
        routes,
        viewRenderer || require('./lib/view/nunjucks-view-renderer').createViewRenderer(viewPath),
        fileWriter.createOutputFile.bind(null, outputPath)).done(callback, callback);
};