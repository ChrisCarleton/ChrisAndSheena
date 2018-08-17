var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');

module.exports = {
	entry: {
		main: './web/app.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /(\.png$|\.jpg$|\.jpeg$)/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]'
					}
				}
			}
		]
	},
	resolve : {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'web')
		],
		extensions: ['.js', '.jsx', '.html']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'web/index.html',
			favicon: 'web/img/favicon.ico'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
			  	}
			}
		}
	}
};
