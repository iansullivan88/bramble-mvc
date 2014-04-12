var blogRepository = require('../data/blog-repository'),
    pageSize = 5;

module.exports = function(req, res) {
    
    this.page = function(pageNumber) {
        pageNumber = parseInt(pageNumber, 10);
        blogRepository.getPosts(function(err, posts) {
            if (err) {
                res.error(err);
            } else {
                res.view({
                    posts:posts.slice(pageNumber*pageSize, pageNumber*pageSize + pageSize),
                    pageNumber: pageNumber,
                    hasPreviousPage: pageNumber > 0,
                    hasNextPage:(pageNumber*pageSize + pageSize) < posts.length,
                    isFirstPage: pageNumber === 0
                });
            }
        });
        
    };
    
    this.post = function(id) {
        blogRepository.getPosts(function(err, posts) {
            if (err) {
                res.error(err);
            } else {
                var post = posts.filter(function(p) {return p.id === id;})[0];
                res.view(post);
            }
        });
    };
    
};