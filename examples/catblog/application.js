// Enable debugging
process.env.DEBUG = 'bramble';

var bramble = require('../../bramble'),
    path = require('path');

bramble.buildSite(path.join(__dirname, "output"), {
    routes: require('./lib/config/route-config'),
    controllers: {
        "blog": require('./lib/controller/blog'),
        "home": require('./lib/controller/home'),
    },
    viewPath: path.join(__dirname, "lib", "view")
}, function(err) {
    if (err) {
        console.log(err.stack);
    } else {
        console.log("Built Successfully");
    }
});