# front-end-workflow-with-gulp
A lightweight frontend framework based on NodeJS, Gulp, Bower, BrowserSync, Embed Template, Bootstrap, Sass, etc.

Automate and enhance your workflow.

No fuss. Just start coding!

> [Yeoman](http://yeoman.io) generator that scaffolds out a front-end web app using [Gulp](http://gulpjs.com/), [Bower](http://bower.io/) and [Bootstrap 3](http://getbootstrap.com/).

### Features

* SASS/SCSS compilation
* CSS & JS minification
* Vendor prefixes
* Image optimization
* Bower packages
* Built-in preview server
* Bootstrap 3
* Fontawesome

## Getting started

1. cd root_folder
2. Run `npm install`
3. Run `bower install`
4. Run `gulp` for starting work

## CSS

For each sass file in `app/sass` a minified CSS file is generated which gets stored in the build `build/css` folder. Partials stored in `app/sass/partials` can be included with `@import file`. Vendor CSS assets can be stored in `src/vendor` and included with `@import file.css` as well. Bootstrap 3 is imported by default.

## Javascript

For each JS file in `app/js` a minified JS file is generated which gets stored in the build `build/js` folder. Partials stored in `app/js/partials` can be included with `//= partials/file.js`. Vendor JS assets can be stored in `app/vendor` and included with `//= ../vendor/file.js`. Bootstrap 3 is imported by default.

## Templates

For each HTML template in `app/template` a HTML file is generated and stored in the build folder. HTML template can be included with `//= template/file.html`

## Images

All images stored in `app/images` are automatically optimized using [gulp-imagemin](https://www.npmjs.org/package/gulp-imagemin) and saved in the build `build/images` directory.

## Fonts

All fonts in the source directory or underlying subdirectories get copied to the build `build/fonts` folder.

## Live Reload

A live reload server is included as well.

## Bower component

All Bower component in `app/bower_components` get copied to the build `build/bower_components` folder.
