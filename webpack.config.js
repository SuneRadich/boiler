const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event || 'test'; //the npm lifecycle_event is not set if running tests directly with karma. So we default to 'test'
const TEST = ENV === 'test' || ENV === 'test-watch';
const PROD = ENV === 'build';

//Setup default config object
const config = {
	plugins: []
};

config.resolve = {
	alias: {
		//Makes relative paths in the foundation setup easier to manage
		'foundation.': 'node_modules/foundation-sites/js/entries/'
	}
};

/**
 * Entry
 * Reference: http://webpack.github.io/docs/configuration.html#entry
 */
config.entry = TEST ?
	void 0 :
	{
		app: [
			'./app/app.js',
		]
	};



config.output = TEST ?
	{} :
	{
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'
	};


config.module = {
	rules: [

		{
			test: /\.js$/,
			loader: 'babel-loader',
			//Exclude the contents of node_modules except foundation-sites/js/entries
			exclude: /node_modules(?!\/foundation-sites\/js\/entries\/)/
		},

		{
			test: /\.css$/,
			loader: TEST
				? 'null-loader'
				: ExtractTextPlugin.extract({
					use: [
						{loader: 'css-loader', query: {sourceMap: true}}
					],
					fallback: 'style-loader'
				})
		},

		{
			test: /\.(ico|png|svg|jpg|gif)$/,
			use: [
				'file-loader'
			]
		},

		{
			test: /\.scss$/,
			loader: TEST ?
				'null-loader' :
				ExtractTextPlugin.extract({
					use: [{
						loader: "css-loader", // translates CSS into CommonJS
						query: {
							sourceMap: true
						}
					}, {
						loader: "sass-loader", // compiles Sass to CSS
						options: {
							includePaths: [path.resolve(__dirname, "node_modules")]
						}
					}],
					fallback: 'style-loader'
				})
		}
	]
}

if (!TEST) {
	config.plugins.push(

		new HtmlWebpackPlugin({
			template: './public/index.html',
			inject: 'body'
		}),

		new ExtractTextPlugin("css/styles.css"),

		new CopyWebpackPlugin([{
				//Make sure the default facicon is availble when building for production
				from: __dirname + '/public/favicon.ico'
			},
			{
				//Handle all images when building for production
				from: __dirname + '/public/images',
				to: 'images/'
			}

		])
	);
}

/**
 * Devtool
 * Reference: http://webpack.github.io/docs/configuration.html#devtool
 * Type of sourcemap to use per build type
 */
if (TEST) {
	config.devtool = 'inline-source-map';
} else if (PROD) {
	config.devtool = 'source-map';
} else {
	config.devtool = 'eval';
}

if (!PROD || !TEST) {
	config.devServer = {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		port: 1508
	}
}

module.exports = config;
