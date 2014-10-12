Bramble MVC
===========
Bramble MVC is a Node.js static site generator which takes a code first approach in generating scalable static sites. Bramble MVC is designed to be as familiar and similar as possible to server based frameworks and maintains much of the same flexibility.

Advantages
----------
Static sites have many advantages over server generated pages. They are secure, robust and fast. Bramble MVC additionally offers many features that are commonly associated with server generated pages:

* Urls are clean and do not contain file names or extensions eg /shop/outdoor/green-tent.
* Sites are completely flexible - you are not forced to make blog sites from pre-defined templates.
* View files are easily reused. The default template rendering engine is the fantastic [Nunjucks](http://jlongster.github.io/nunjucks/) which has a lot of rich features one of which is view inheritance.
* Urls are generated within anchor tags - 404 errors become build time errors.
* Minimal configuration is required.

Getting Started
---------------
Look at the [example project](https://github.com/iansullivan88/bramble-mvc-example) to see how to tell Bramble MVC to build your site.

Contributing
------------
The project is licensed under MIT so please feel free to take the source and use it as you wish. If you notice any bugs or have a feature request, please submit and issue or even better, submit a pull request. Unit tests can be run using `node test`.

License
-------
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
