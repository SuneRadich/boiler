/**
* This file contains the webpack config used for when running unit tests
*/
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');


//Use Merge.smart to correctly overwrite certain object settings
module.exports = Merge.smart(CommonConfig, {

    /**
     * Entry
     * Reference: https://webpack.js.org/configuration/entry-context/#entry
     */
    entry: null,
    // Do not genereate output when running tests, Karma takes care of that
    output: {},

    devtool: 'inline-source-map',

    //Do not handle css or scss when testing javascript logic
    module: {
        rules: [{
                test: /\.css$/,
                loader: 'null-loader'
            },
            {
                test: /\.scss$/,
                loader: 'null-loader'
            }
        ]
    }
})
