var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var del = require('del');
var path = require('path');
var through = require('through2');

gulp.task('build.ts', function () {
	var tsProject = tsc.createProject('tsconfig.json', {
		typescript: require('typescript')
	});

	var result = gulp.src('src/**/*.ts')
					 .pipe(sourcemaps.init())
					 .pipe(tsc(tsProject))
	;

	return result.js
		  .pipe(sourcemaps.write())
		  .pipe(gulp.dest('dist'));
});

gulp.task('build.assets', function () {
	return gulp.src([ 'src/**/*.css', 'src/**/*.html' ])
			   .pipe(gulp.dest('dist'))
	;
});

gulp.task('build', [ 'build.ts', 'build.assets' ]);

gulp.task('default', function () {
	gulp.src('src/**/*')
		.pipe(watch('src/**/*', batch(function (events, done) {
			events.on('data', function (file) {
				if (file.event !== 'unlink') {
					return;
				}

				var filePathFromSrc = path.relative(path.resolve('src'), file.path);
				var destFilePath = path.resolve('dist', filePathFromSrc);

				if (path.extname(destFilePath) === '.ts') {
					destFilePath = destFilePath.slice(0, -3) + '.js';
				}

				del.sync(destFilePath);
			});
			events.on('end', function () {
				gulp.start('build', done);
			});
		})))
	;
});
