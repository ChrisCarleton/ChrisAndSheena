var common = require('./webpack.common');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpackMerge = require('webpack-merge');

module.exports = webpackMerge(
	common,
	{
		devtool: 'cheap-module-eval-source-map',
		output: {
			path: path.join(__dirname, 'dist/dev/'),
			publicPath: '/',
			filename: '[name].js',
			chunkFilename: '[id].chunk.js'
		},
		plugins: [
			new ExtractTextPlugin('[name].css')
		]
	}
);
