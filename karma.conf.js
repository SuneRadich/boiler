const webpackConfig = require('./webpack.test');

// Karma configuration
// Generated on Wed Aug 02 2017 08:39:20 GMT+0200 (CEST)

module.exports = function(config) {

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [
			'./node_modules/angular/angular.min.js',
			'./node_modules/angular-mocks/angular-mocks.js',
			{
				pattern: './app/**/*.test.js',
				watched: false
			}
		],


		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			// add webpack as preprocessor
			'./app/**/*.test.js': ['webpack']
		},

		webpack: webpackConfig,

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		// Listen for npm_lifecycle_event, if it exists, we assume karma was intiailized through `npm test` otherwise, assume it was started directly with `karma start`
		// When running in Chrome (or any other real browser, we can open up a debug view and developer console to inspect more about the running/failing tests)
		browsers: process.env.npm_lifecycle_event ? ['PhantomJS'] : ['Chrome'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
        // Detect if we are running as part of npm test, and if so, only run once. If on the other hand we run normally (karma start), start continuous watch
		singleRun: process.env.npm_lifecycle_event ? true : false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		client: {
			//Disable console output when running tests
			captureConsole: false
		},

		webpackMiddleware: {
	 		noInfo: true, // 'errors-only'
   		}
	});
};
