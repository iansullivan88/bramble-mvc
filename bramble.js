var fs = require('fs'),
    path = require('path'),
    fileWriter = require('./lib/view/file-writer'),
    processRequestLoop = require('./lib/processing/process-request-loop'),
    processRequest = require('./lib/processing/process-request');

/**
* The method is the entry point to Bramble MVC. Calling it will export your site to the specified
* output directory.
*
* @method buildSite
* @param outputDirectory {String} That root directory to which files are exported
* @param options {Object} An object to specify options when building the site
* @param options.routes {[Object]} List of routes
* @param options.controllers {Object} A name value collection of controller constructor functions
* @param [options.urls=['/']] {String[]} The initial list of urls to process
* @param [options.viewRenderer] {Function} The view renderer used to process views (Nunjucks is used by default)
*/
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