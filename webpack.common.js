/**
* This file contains the webpack config used for all builds
*/

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
        filename: 'js/[name].bundle.[hash].js'
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

                        /**
                        * Make select scss resources globally available for all scss files in the solution
                        */
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [

                                    //Load default foundation from the npm package
                                    'node_modules/foundation-sites/scss/foundation.scss',

                                    // ZURB utility to assist in animating things. It is used for foundation things like Toggler, Reveal and Orbit
                                    //@see http://foundation.zurb.com/sites/docs/motion-ui.html
                                    'node_modules/motion-ui/src/motion-ui.scss',

                                    //Load our custom overwrites of foundation settings
                                    'vendor/foundation/settings.scss',

                                    'app/variables.scss',

                                    //Initialize Foundation sass parts
                                    'vendor/foundation/foundation.scss',

                                ]
                            },
                        },
                    ],

                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    //name: 'public/fonts/[name].[ext]'
                }
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
    stats: 'errors-only'

};

module.exports = config;
