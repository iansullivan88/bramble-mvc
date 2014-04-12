var fs = require('fs'),
    path = require('path'),
    fileWriter = require('./lib/view/file-writer'),
    processRequestLoop = require('./lib/processing/process-request-loop'),
    processRequest = require('./lib/processing/process-request');

exports.buildSite = function(outputDirectory, options, callback) {
    
    var viewPath = options.viewPath || path.join(process.cwd(), 'lib', 'view');
    var status = processRequestLoop(
            processRequest,
            options.urls || ['/'],
            options.routes,
            options.controllers,
            options.viewRenderer || require('./lib/view/nunjucks-view-renderer').createViewRenderer(viewPath),
            fileWriter.createOutputFile.bind(null, outputDirectory));
    
    status.done(function() {
        callback();
    }, function(error) {
        callback(error);
    });
    
};