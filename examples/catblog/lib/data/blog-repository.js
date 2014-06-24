// blog-repository.js reads blog posts from files in the /posts folder

var fs = require('fs'),
	frontMatter = require('yaml-front-matter'),
	path = require('path'),
	postPath = path.join(path.dirname(require.main.filename), "posts"),
	blogPosts = fs.readdirSync(postPath).map(function(filePath) {
		var parsedContent = frontMatter.loadFront(fs.readFileSync(path.join(postPath, filePath))),
			date = new Date(Date.parse(parsedContent.date));
		
		return {
			id:path.basename(filePath).split('.')[0],
			title:parsedContent.title,
			date:date,
			dateString:(date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear(),
			content:parsedContent.__content
		};
	}).sort(function(a, b) {
		return b.date.getTime() - a.date.getTime();
	});

exports.getPosts = function(callback) {
	callback(null, blogPosts);
};