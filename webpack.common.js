var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		'polyfills': './web/polyfills.ts',
		'vendor': './web/vendor.ts',
		'app': './web/app.ts'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [
					'awesome-typescript-loader',
					'angular2-template-loader'
				]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file-loader?name=img/[name].[hash].[ext]'
			},
			{
				test: /\.css$/,
				exclude: path.join(__dirname, 'web/styles/'),
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader?sourceMap'
				})
			},
			{
				test: /\.css$/,
				include: path.join(__dirname, 'web/styles/'),
				loader: 'raw-loader'
			}
		]
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.join(__dirname, 'web/'),
			{}
		),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),
		new HtmlWebpackPlugin({
			template: './web/index.html',
			favicon: path.join(__dirname, 'web/img/favicon.ico')
		})
	]
};
