var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify({entries: './client/root', extensions: ['.jsx', '.js'], debug: true})
        .transform('babelify', { presets: ['es2015', 'react'], plugins: ['transform-object-rest-spread'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./wwwroot/'));
});

gulp.task('watch', function () {
    gulp.watch('./client/**/*{.js,.jsx}', ['build']);
});

gulp.task('default', ['watch']);