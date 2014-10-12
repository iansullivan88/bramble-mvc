var nunjucks = require("nunjucks"),
    path = require("path");

exports.createViewRenderer = function(viewFolder) {
    var viewLoader = new nunjucks.FileSystemLoader(viewFolder);
    
    return function(viewName, model, resolveUrl) {
        if (model.hasOwnProperty('url')) {
            throw new Error("View models cannot have a property named 'model' - it is a reserved key.");
        }
        model.url = resolveUrl;
        
        var environment = new nunjucks.Environment([viewLoader]);
        environment.addFilter('url', resolveUrl);
        return environment.render(viewName + ".html", model);
        
    };
};