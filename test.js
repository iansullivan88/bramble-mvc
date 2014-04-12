// Find all directories under 'test' and run the tests with nodeunit

var diveSync = require("diveSync"),
	fs = require("fs"),
	nodeUnit = require('nodeunit'),
	directoriesToTest = ['test'];

diveSync(directoriesToTest[0], {directories:true}, function(err, file) {
	if (fs.lstatSync(file).isDirectory()) {
		directoriesToTest.push(file);
	}
});

nodeUnit.reporters.default.run(directoriesToTest);