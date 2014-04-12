var matcher = require("../../lib/routing/route-matcher"),
    extend = require("node.extend");

var defaultRoute = {
	path: ":controller/:action/:id",
	defaults: {
		controller:"home",
		action:"index",
		id:null
	}
};

var blogRoute = {
	path: "news/blog/page/:page",
	defaults: {
		controller:"news",
		action:"index",
		page:0
	}
};

var hasRequiredRoute = {
    path: ":controller/:required/:id",
    defaults: {
        controller:"news",
        action:"index",
        id:0
    }
};



exports.getRouteMatch = {
    'defaults for empty route are correct': function (test) {
        test.deepEqual(
            matcher.matchRoute([defaultRoute], "/").parameters,
            defaultRoute.defaults);
        test.done();
    },
    'if the first route does not match, the second is attempted': function (test) {
        test.deepEqual(
            matcher.matchRoute([blogRoute, defaultRoute], "/").parameters,
            defaultRoute.defaults);
        test.done();
    },
    'variables are correctly parsed in the route': function (test) {
        test.deepEqual(
            matcher.matchRoute([blogRoute, defaultRoute], "/customController/customAction").parameters,
            extend(extend({},  defaultRoute.defaults, {controller:"customController", action:"customAction"})));
        test.done();
    },
    'fixed sections in the url are not included in the returned parameters': function (test) {
        test.deepEqual(
            matcher.matchRoute([blogRoute], "/news/blog/page/").parameters,
            blogRoute.defaults);
        test.done();
    },
    'route is correctly returned': function (test) {
        test.deepEqual(
            matcher.matchRoute([blogRoute], "/news/blog/page/").route,
            blogRoute);
        test.done();
    },
    'if no routes match, undefined is returned': function (test) {
        test.strictEqual(
            matcher.matchRoute([blogRoute], "/notmatched/"),
            undefined);
        test.done();
    },
    "a route doesn't match if it has too many parameters": function (test) {
        test.strictEqual(
            matcher.matchRoute([defaultRoute], "/1/2/3/4/5/6/7"),
            undefined);
        test.done();
    },
    "a route doesn't match if required parameters are missing": function (test) {
        test.strictEqual(
            matcher.matchRoute([hasRequiredRoute], "/test"),
            undefined);
        test.done();
    }
};