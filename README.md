# Bramble MVC
Bramble MVC is a Node.js static site generator which takes a code first approach in generating scalable static sites. Bramble MVC is designed to be as familiar and similar as possible to server based MVC frameworks and maintains much of the same flexibility.

## Advantages
Static sites have many advantages over server generated pages. They are secure, robust and fast. Bramble MVC additionally offers many features that are commonly associated with server generated pages:

* Urls are clean and do not contain file names or extensions eg /blog/posts/my-post.
* Controllers are plain old javascript objects and therefore can contain arbitrary code allowing you to use any source of data you like. They can call web services, read the file system or pull data from a database.
* View files are easily reused. The default template rendering engine is the fantastic [Nunjucks](http://jlongster.github.io/nunjucks/) which has many rich features one of which is view inheritance.
* Minimal configuration is required.

## How it Works
The best way to see how Bramble MVC works is by running through an example. The following sections describe a simplified version of the example site 'catblog' included in the examples. It is a simple content site with paginated blog posts. The first step is to create a controller.

### Controllers
Controllers are responsible for handling urls and passing data to views. The following shows a controller for creating blog pages:

```js
var blogController = function(req, res) {
    this.post = function(id) {
        blogRepository.getPostForId(id, function(post) {
            res.view(post);
        });
    };
    
    this.page = function(pageNumber) {
        pageNumber = parseInt(pageNumber, 10);
        blogRepository.getAll(function(posts) {
            res.view({
                posts:posts.slice(pageNumber*pageSize, pageNumber*pageSize + pageSize),
            });
        });
        
    };
};
```

This controller has two 'actions', one called 'post' and one called 'page'. The 'post' action passes a single post to a view which displays a page on the site containing a single post. The 'page' action passes several posts to a view that displays a page of posts. The controller uses something called `blogRepository`. This is arbitrary and can be whatever you like. It can call a web service or get posts from a database - it really doesn't matter. Once the data is retrieved from the source, it is passed to the view using the `view` method on the response object.

This is the only code required to get a paginated blog working. There are no plugins or other configuration required. To match urls to controllers and actions, 'routes' are defined.

### Routes
Routes in Bramble MVC work in exactly the same way as routes in a traditional server side MVC framework. Two routes used in the example blog site are shown below:

```js
[{
    path: "blog/:pageNumber",
    defaults: {
        controller:"blog",
        action:"page",
        pageNumber:0
    }
},
{
    path: ":controller/:action/:id",
    defaults: {
        controller:"home",
        action:"index",
        id:null
    }
}];
```

Url parts that begin with a `:` are variable paramters. Variables can then be extracted from urls and passed to controllers and actions. The special `:action` and `:controller` variables are used to select the controller and action and all other variables are arbitrary and are bound the action arguments of the same name. For example, given the routes above, the following urls would select the following controllers, actions and parameters:

URL  | Controller | Action | Parameters
- | - | - | -
/ | home | index | id = null
/about | about | index | id = null
/about/contact/uk | about | contact | id = uk
/blog/post/first-post | blog | post | id = first-post
/blog/4 | blog | page | pageNumber = 4

The blog controller is defined above and would therefore handle the last two urls in the table. `/blog/4` would invoke the `page` action on the controller named `blog` and `pageNumber` would have a value of `"4"`. When the `view` method is called on the `res` object, it passes a model to a view.

### Views
[Nunjucks](http://jlongster.github.io/nunjucks/) is used to render views and has great documentation. By default, the view that is loaded will be `view/controllerName/actionName.html` or `view/shared/actionName.html`. To use a different html file, a second parameter can be passed into `res.view` to specify the name of the view to use. The following view (`view/blog/post.html`) is for rendering a single post:

```html
{% extends "layout.html" %}

{% block content %}

<article class="post">
	<header>
		<h2>{{title}}</h2>
		<time>{{date}}</time>
	</header>
	<p>{{content}}</p>
</article>

{% endblock %}
```

The base layout `layout.html` is in the `view/shared` directory and contains all of the shared headers, footers, menus javascript and css.

###Route Resolving
The elegant part of Bramble MVC is in determining which urls should be processed. By default, only one - the root url `/`. An array of urls can be passsed to Bramble MVC but it is best to avoid this overhead. Suppose you are pulling blog posts from a content managed database, you don't want to configure a url for each page eg `/blog/1`, `/blog/2`, `/blog/3` etc. The site should grow dynamically. The layout used in the blog example contains html that looks like this:

```html
<nav>
  <ol>
    <li><a href="{{ url('/') }}">Home</a></li>
    <li><a href="{{ url('/blog') }}">Blog</a></li>
    <li><a href="{{ url('/home/about') }}">About</a></li>
  </ol>
</nav>
```
The `url` function returns the url that was passed in but it also registers the url to be processed by Bramble MVC. After `/` is processed `/blog` and `/home/about` will also be processed. This has the added benefit of ensuring there are strictly zero broken links on your website. The blog pages have the following two links on them:

```html
<a href="{{ url("/blog/post/" + post.id) }}">{{post.title}}</a>
<a href="{{ url("/blog/" + (pageNumber + 1)) }}">older</a>
```

The first line links to the a page containg the full post - this means the post page itself will be generated. The second links to the next page of posts. Simple! No specifying urls upfront; just like a server based MVC framework!

## Getting Started
Look at the site in 'examples' to see how to tell Bramble MVC to build your site. Logging can be enabled in Bramble MVC by setting the `DEBUG` environment variable to `'bramble'`.


## Contributing
The project is licensed under MIT so please feel free to take the source and use it as you wish. If you notice any bugs or have a feature request, please submit and issue or even better, submit a pull request. Unit tests can be run using `node test`.

## License
The MIT License (MIT)

Copyright (c) 2014 Ian Sullivan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.