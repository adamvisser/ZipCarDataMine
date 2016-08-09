//a lot of this file has been copy/pasted from foundation 6's gulpfile.babel.js
//some of this will have comments, some of it will need comments as i figure out what its actually doing....

'use strict';

var plugins = require('gulp-load-plugins');
var browser = require('browser-sync');
var gulp    = require('gulp');
var rimraf  = require('rimraf');
var yaml    = require('js-yaml');
var fs      = require('fs');

//a fix for some stuff i dont want to edit right now...
var PRODUCTION = false;

// Load all Gulp plugins into one variable
const $ = plugins();

// Load settings from settings.yml
var settingsJSON = loadConfig();
const COMPATIBILITY = settingsJSON.COMPATIBILITY;
const PORT = settingsJSON.PORT;
const UNCSS_OPTIONS = settingsJSON.UNCSS_OPTIONS;
const PATHS = settingsJSON.PATHS;

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}


// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, sass, javascript, javascriptLibraries, images, copy, templates, extracss));

// Build the "dist" folder by running all of the below tasks
gulp.task('quick',
 gulp.series(quickjavascript));

gulp.task('dev',
 gulp.series(server, watch));

gulp.task('laravel-dev',
 gulp.series(laravel_watch));

gulp.task('laravelize',
 gulp.series( laravel_sass, laravel_copy, laravel_javascript, laravel_javascriptLibraries,laravel_images, laravel_templates, laravel_extracss));

gulp.task('watch', gulp.series('build', server, watch));
// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('watch'));


function laravel_watch() {
  gulp.watch(PATHS.templates, laravel_templates);
  gulp.watch(PATHS.assets, laravel_copy);
  gulp.watch(PATHS.extracss, laravel_extracss);
  gulp.watch('src/assets/scss/**/*.scss', laravel_sass);
  gulp.watch('src/assets/js/**/*.js', gulp.series(laravel_javascript));
  gulp.watch('src/assets/img/**/*', gulp.series(laravel_images));
}


// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf('distribution', done);
}

function quickclean(done) {
  rimraf('../DataMine/public/js', done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest('distribution/'));
}


function laravel_copy(){
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest('../DataMine/public/'));
}

function templates(){
  return gulp.src(PATHS.templates)
    .pipe(gulp.dest('distribution/views'));
}

function laravel_templates(){
  return gulp.src(PATHS.templates)
    .pipe(gulp.dest('../DataMine/public/views'));
}

function extracss(){
  return gulp.src(PATHS.extracss)
    .pipe(gulp.dest('distribution/css'));
}


function laravel_extracss(){
  return gulp.src(PATHS.extracss)
    .pipe(gulp.dest('../DataMine/public/css'));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('distribution/css'))
    .pipe(browser.reload({ stream: true }));
}

function laravel_sass() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('../DataMine/public/css'))
    .pipe(browser.reload({ stream: true }));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('app.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('distribution/js'));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascriptLibraries() {
  return gulp.src(PATHS.javascriptLibraries)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('frameworks.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('distribution/js'));
}

function laravel_javascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('app.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('../DataMine/public/js'));
}

// Combine JavaScript into one file
// In production, the file is minified
function laravel_javascriptLibraries() {
  return gulp.src(PATHS.javascriptLibraries)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('frameworks.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('../DataMine/public/js'));
}

// Combine JavaScript into one file
// In production, the file is minified
function quickjavascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat('app.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('../DataMine/public/js'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest('distribution/img'));
}

function laravel_images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest('../DataMine/public/img'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: 'distribution', port: PORT
  });
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.templates, templates);
  gulp.watch(PATHS.assets, copy);
  gulp.watch(PATHS.extracss, extracss);
  gulp.watch('src/assets/scss/**/*.scss', sass);
  gulp.watch('src/assets/js/**/*.js', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*', gulp.series(images, browser.reload));
}
