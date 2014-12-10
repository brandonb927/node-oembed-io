var gulp        = require('gulp');
var git         = require('gulp-git');
var mocha       = require('gulp-mocha');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var spawn       = require('child_process').spawn;

var pkg     = require('./package.json');
var v       = 'v' + pkg.version;
var message = 'Release ' + v;

gulp.task('default', function () {
  // Do something here
});

gulp.task('lint', function () {
  return gulp.src('./**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('mocha', ['lint'],  function () {
  return gulp.src(['./oembed-io.js', 'test/*.js'])
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('commit', function () {
  return gulp.src('./')
    .pipe(git.add())
    .pipe(git.commit(message));
});

gulp.task('tag', ['commit'], function () {
  return git.tag(v, message, function (err) {
    if (err) { throw err; }
  });
});

gulp.task('push', ['tag'], function () {
  git.push('origin', 'master', { args: ' --tags' }, function (err) {
    if (err) { throw err; }
  });
});

gulp.task('npm', ['push'], function(done) {
  spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('test', ['mocha']);

gulp.task('release', ['npm']);
