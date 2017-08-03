const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');


//Merge common config with development mode specific settings
module.exports = Merge(CommonConfig, {
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true
        }),

        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'js/vendor.js',
            children: true
        }),

        new ExtractTextPlugin("css/styles.[hash].css"),
    ],

    /**
     * Development server
     * Reference: https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 1508,
        overlay: true,
        open: true,
        openPage: '.',
        //Turn off most output details when running webpack
        stats: {
            colors: true,
            //Output bundle hash
            hash: false,
            //Output webpack version
            version: false,
            timings: false,
            assets: true,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: false,
            warnings: false,
            publicPath: false
        }
    }
})
