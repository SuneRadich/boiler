# Frontend boilerplate
A basic skeleton for a new project, utilizing [webpack3](https://webpack.js.org), [angular1](https://angularjs.org/), [foundation6](http://foundation.zurb.com/sites.html) and [karma unittesting](https://karma-runner.github.io/1.0/index.html)!

## Foundation framework
Can be configured in the `vendor/` folder. It is possible to toggle both css parts as well as javascript plugins.

## How to start development build
First make sure you have all npm modules installed by running a ´npm install´. After that, you can start off the build for development by running `npm run dev`.

This will bundle up all javascript and stylesheets, start up a dev server and open a browser window with the solution.

## How to start production build
First make sure you have all npm modules installed by running a ´npm install´. After that, you can start off the build for production by running `npm run dev`.

This will bundle up all javascript and stylesheets, and output everything to the `/dist` folder.

## How to run unit tests

### Continuous testing
Unit tests can be run in two ways. The test setup is done using the [Karma](https://karma-runner.github.io/1.0/index.html) test runner. So we can run the unit test suite by issuing `karma start`.

In order to run karma from the command line, you will need to install the `karma-cli` package globally. Do that by issuing `npm install -g karma-cli`

If you then fire `karma start`, karma will open up a new instance of a Chrome browser, and run all tests in that browser instance. It will also keep the browser and karma instance running, rerunning tests if the source code and/or unit test logic is changed.

### One time test run
You can also run the unit tests by issuing `npm test`. This is intented to be used on a CI server, and will only run the test suite once. Executing all tests in a headless PhantomJS instance.
