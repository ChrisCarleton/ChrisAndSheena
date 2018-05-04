import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackStream from 'webpack-stream';

gulp.task('test', () => {});

gulp.task('bundle-dev', () => {
	return gulp.src('web/app.ts')
		.pipe(webpackStream(require('./webpack.dev'), webpack))
		.pipe(gulp.dest('dist/dev'));
});

gulp.task('bundle-prod', () => {
	return gulp.src('web/app.ts')
		.pipe(webpackStream(require('./webpack.prod'), webpack))
		.pipe(gulp.dest('dist/prod'));
});

gulp.task('serve', done => {
	new webpackDevServer(
		webpack(require('./webpack.dev')),
		{
			contentBase: 'dist/dev/',
			historyApiFallback: true,
			hot: true,
			index: 'index.html',
			port: 8080,
			watchContentBase: true
		}
	)
	.listen(8080, 'localhost', err => {
		if (err) {
			return done(err);
		}

		gutil.log('[webpack-dev-server]', 'Webpack dev server running at http://localhost:8080/.');
		done();
	});
});

gulp.task('default', ['serve']);
