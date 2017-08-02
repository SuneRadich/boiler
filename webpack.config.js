const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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

/**
 * Resolve
 * Reference: https://webpack.js.org/configuration/resolve/
 */
config.resolve = {
    alias: {
        //Makes relative paths in the foundation setup easier to manage
        'foundation.': 'node_modules/foundation-sites/js/entries/'
    }
};

/**
 * Entry
 * Reference: https://webpack.js.org/configuration/entry-context/#entry
 */
config.entry = TEST ?
    void 0 : {
        app: [
            './app/app.js',
        ]
    };


/**
 * Output
 * Reference: https://webpack.js.org/configuration/output/
 */
config.output = TEST ? {} : {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
};


/**
 * Module
 * Reference: https://webpack.js.org/configuration/module/
 */
config.module = {
    rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            //Exclude the contents of node_modules except foundation-sites
            exclude: /node_modules(?!\/foundation-sites\/)/
        },
        {
            test: /\.css$/,
            loader: TEST ?
                'null-loader' : ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            query: {
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        'postcss-loader'
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
                'null-loader' : ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader", // translates CSS into CommonJS
                            query: {
                                sourceMap: true,
                                minimize: true
                            }
                        },

                        'postcss-loader',

                        {
                            loader: "sass-loader", // compiles Sass to CSS
                            options: {
                                includePaths: [path.resolve(__dirname, "node_modules")]
                            }
                        },

                    ],

                    fallback: 'style-loader'
                })
        }
    ]
}

/**
 * Plugins
 * Reference: https://webpack.js.org/configuration/plugins/
 */
if (!TEST) {
    config.plugins.push(

        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body'
        }),

        new webpack.optimize.UglifyJsPlugin({
            minimize: true
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
    );
}

/**
 * Devtool
 * Reference: https://webpack.js.org/configuration/devtool/
 * Type of sourcemap to use per build type
 */
if (TEST) {
    config.devtool = 'inline-source-map';
} else if (PROD) {
    config.devtool = 'source-map';
} else {
    config.devtool = 'eval';
}

/**
 * Development server
 * Reference: https://webpack.js.org/configuration/dev-server/
 */
if (!PROD || !TEST) {
    config.devServer = {
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
}

/**
 * Stats
 * Reference: https://webpack.js.org/configuration/stats/
 */
config.stats = 'errors-only';


module.exports = config;
