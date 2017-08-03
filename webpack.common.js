const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//Setup default config object
const config = {

    /**
     * Entry
     * Reference: https://webpack.js.org/configuration/entry-context/#entry
     */
    entry: {
        app: [
            './app/app.js',
        ]
    },

    /**
     * Output
     * Reference: https://webpack.js.org/configuration/output/
     */
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },

    /**
     * Resolve
     * Reference: https://webpack.js.org/configuration/resolve/
     */
    resolve: {
        alias: {
            //Makes relative paths in the foundation setup easier to manage
            'foundation.': 'node_modules/foundation-sites/js/entries/',
            'modernizr$': path.resolve(__dirname, './.modernizrrc.js')
        }
    },

    /**
     * Module
     * Reference: https://webpack.js.org/configuration/module/
     */
    module: {
        rules: [{
                test: /\.modernizrrc\.js$/,
                loader: 'webpack-modernizr-loader?useConfigFile',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                //Exclude the contents of node_modules except foundation-sites
                exclude: /node_modules(?!\/foundation-sites\/)/
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
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
                loader: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader', // translates CSS into CommonJS
                            options: {
                                sourceMap: true,
                            }
                        },

                        {
                            //also see ./postcss.config.js
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },

                        {
                            loader: 'sass-loader', // compiles Sass to CSS
                            options: {
                                sourceMap: true,
                                includePaths: [path.resolve(__dirname, 'node_modules')]
                            }
                        },

                    ],

                    fallback: 'style-loader'
                })
            }
        ]
    },

    /**
     * Devtool
     * Reference: https://webpack.js.org/configuration/devtool/
     * Type of sourcemap to use per build type
     */
    devtool: 'eval',

    /**
     * Stats
     * Reference: https://webpack.js.org/configuration/stats/
     */
    //stats: 'errors-only'

};

module.exports = config;
