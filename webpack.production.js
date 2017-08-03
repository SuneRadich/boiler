const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = Merge(CommonConfig, {

    devtool:'source-map',

    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            //minimize: true,
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),

        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'js/vendor.js',
            children: true
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
    ]
})
