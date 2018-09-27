'use strict';

const gulp = require("gulp"),
      sass = require("gulp-sass"),
      clean = require('gulp-clean');

// set paths ...
const config = {
	scssPath: "src/{govuk-frontend,scss}",
	destPath: "application/static/stylesheets",
  govukAssetPath: "application/static/govuk-frontend/assets"
}

// Delete our old stylesheets files
gulp.task('clean-css', function () {
  return gulp.src('application/static/stylesheets/**/*', {read: false})
    .pipe(clean());
});

// compile scss to CSS
gulp.task("scss", ['clean-css', 'copy-assets'], function() {
	return gulp.src( config.scssPath + '/*.scss')
	.pipe(sass({outputStyle: 'expanded',
		includePaths: [ 'src/scss',
			'src/govuk-frontend']})).on('error', sass.logError)
	.pipe(gulp.dest(config.destPath))
})

// Watch src folder for changes
gulp.task("watch", ["scss"], function () {
  gulp.watch("src/scss/**/*", ["scss"])
});

gulp.task('copy-assets', function() {
  gulp.src('src/govuk-frontend/assets/**/*')
    .pipe(gulp.dest(config.govukAssetPath));
});

// Set watch as default task
gulp.task("default", ["watch"]);
