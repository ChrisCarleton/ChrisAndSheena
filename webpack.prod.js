var common = require('./webpack.common');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(
	common,
	{
		devtool: 'source-map',
		output: {
			path: path.join(__dirname, 'dist/prod/'),
			publicPath: '/',
			filename: '[name].min.js',
			chunkFilename: '[id].chunk.min.js'
		},
		plugins: [
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.optimize.UglifyJsPlugin({
				mangle: {
					keep_fnames: true
				}
			}),
			new ExtractTextPlugin('[name].[hash].min.css'),
			new webpack.DefinePlugin({
				'process.env': {
					'ENV': JSON.stringify(ENV)
				}
			}),
			new webpack.LoaderOptionsPlugin({
				htmlLoader: {
					minimize: false
				}
			})
		]
	}
);
