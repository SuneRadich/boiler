const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: [
//            'jquery',
//            'foundation-sites/js/entries/foundation',
            './app/app.js',
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },

    resolve: {
        alias: {
            'foundation.': 'node_modules/foundation-sites/js/entries/'
        }
    },

    // @see http://moduscreate.com/es6-es2015-import-no-relative-path-webpack/
    // resolve: {
    //   modules: [
    //     path.resolve('./app'),
    //     path.resolve('./node_modules')
    //   ]
    // },

    devtool: 'inline-source-map',

    module: {
        rules: [

            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules(?!\/foundation-sites\/js\/entries\/)/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader", // compiles Sass to CSS
                    options: {
                        includePaths: [ path.resolve(__dirname, "node_modules") ]
                    }
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body'
        }),
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 1508
    }

};

module.exports = config;
