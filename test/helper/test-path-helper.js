var pathHelper = require("../../lib/helper/path-helper");


exports.createRootRelativePath = {
    'root remains unchanged': function (test) {
        test.strictEqual(pathHelper.createRootRelativePath("/", ""), "/");
        test.done();
    },
    'paths from root are correctly created': function (test) {
        test.strictEqual(pathHelper.createRootRelativePath("/", "a/b"), "/a/b");
        test.done();
    },
    'trailing slashes are removed': function (test) {
        test.strictEqual(pathHelper.createRootRelativePath("/", "a/b/"), "/a/b");
        test.done();
    },
    'current item is correctly replaced': function (test) {
        test.strictEqual(pathHelper.createRootRelativePath("/a/b/c", "d/e"), "/a/b/d/e");
        test.done();
    },
    'current path is ignored if root path is used': function (test) {
        test.strictEqual(pathHelper.createRootRelativePath("/a/b/c", "/d/e/"), "/d/e");
        test.done();
    },
    'relative paths are resolved': function (test) {
        test.strictEqual(pathHelper.createRootRelativePath("/a/b/c", "../d/e/"), "/a/d/e");
        test.done();
    },
    'paths higher than the root are assumed to be the root': function (test) {
        test.strictEqual(pathHelper.createRootRelativePath("/a", "../../../../d/e"), "/d/e");
        test.done();
    }
};

exports.createFilePathForRootRelativePath = {
    'root path returns root file path': function (test) {
        test.strictEqual(pathHelper.createFilePathForRootRelativePath("c:\\temp\\site", ""), "c:\\temp\\site");
        test.strictEqual(pathHelper.createFilePathForRootRelativePath("c:\\temp\\site", "/"), "c:\\temp\\site\\");
        test.done();
    },
    'paths are correctly appended': function (test) {
        test.strictEqual(pathHelper.createFilePathForRootRelativePath("c:\\temp\\site", "/blog"), "c:\\temp\\site\\blog");
        test.done();
    },
    
};