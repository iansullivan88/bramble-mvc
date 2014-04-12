var nunjucks = require("nunjucks"),
    path = require("path");

exports.createViewRenderer = function(viewFolder) {
    var sharedLoader = new nunjucks.FileSystemLoader(path.join(viewFolder, 'shared'));
    var controllerViewLoaders = {};
    
    return function(controllerName, viewName, model, resolveUrl) {
        var viewLoader = controllerViewLoaders[controllerName];
        if (!viewLoader) {
            viewLoader = new nunjucks.FileSystemLoader(path.join(viewFolder, controllerName));
            controllerViewLoaders[controllerName] = viewLoader;
        }
        
        if (model.hasOwnProperty('url')) {
            throw new Error("View models cannot have a property named 'model' - it is a reserved key.");
        }
        model.url = resolveUrl;
        
        var environment = new nunjucks.Environment([viewLoader, sharedLoader]);
        environment.addFilter('url', resolveUrl);
        return environment.render(viewName + ".html", model);
        
    };
};