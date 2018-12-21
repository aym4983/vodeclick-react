"use strict"

// import the modules we need
var gulp = require('gulp');
var conn = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var lint = require('gulp-eslint');

// configurations values
var config = {
  port: 5500,
  baseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    indexJs: './src/index.js',
    css: [
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/css/bootstrap-reboot.min.css',
      './node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
    ],
    dist: './dist'
  }
};

// launch a local server for development
gulp.task('conn', function(done){
  conn.server({
    root: ['dist'],
    port: config.port,
    base: config.baseUrl,
    livereload: true
  });
  done();
});

// Open the url on the server
gulp.task('open', gulp.series('conn', function(done){
  gulp.src('dist/index.html')
    .pipe(open({uri: config.baseUrl + ':' + config.port + "/"}));
    done();
}));

// Copy html to dist
gulp.task('html', function(done){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(conn.reload());
    done();
});

// Transform jsx to js
gulp.task('js', function(done){
  browserify(config.paths.indexJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + "/js"))
    .pipe(conn.reload());
    done();
});

// to manage css files
gulp.task('css', function(done){
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
    done();
});

gulp.task('lint', function(done){
  return gulp.src(config.paths.js)
    .pipe(lint({config: '.eslintrc.json'}))
    .pipe(lint.format());
    done();
})

// Watch the files and reload
gulp.task('watch', function(done){
  gulp.watch(config.paths.html, gulp.series('html'));
  gulp.watch(config.paths.js, gulp.series('js'));
  done();
});

// Default task
gulp.task('default', gulp.series('html', 'js', 'css', 'lint', 'open', 'watch', function(){
  return new Promise(function(resolve, reject) {
    console.log("HTTP Server Started");
    resolve();
  });
}));
