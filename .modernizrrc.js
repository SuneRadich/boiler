/**
* This file controls the configuration of the modernizr setup used in the solution
*/

'use strict';

//@see https://github.com/itgalaxy/webpack-modernizr-loader and @see https://modernizr.com/download?setclasses

/**
* In order to see what possible feature-detects are supported, go to https://modernizr.com/download?setclasses, and check what you need.
* Then click the 'Build' button, and select the Command Line Config 'Copy to Clipboard'. There you can see the configuration object needed.
*
* All builds there have minify selected, but that can be ommitted because we off course minify our bundles through the webpack setup
*/
module.exports = {
    options: [
        "setClasses"
    ],
    "feature-detects": [
        "test/css/flexbox",
        "test/es6/promises"
    ]
};
