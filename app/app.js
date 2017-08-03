import angular from 'angular';

import $ from 'jquery';

import modernizr from 'modernizr';

//Import foundation styling
//import 'styles/foundation.scss';

import './app.scss';

//Import foundation javascript and scss
import "vendor/foundation/foundation";

import controller from './app.controller';
import Calc from './services/calculate.service';

var app = angular.module('app', []);

app
	.controller('appController', controller)
	.factory('Calculator', Calc);


angular.bootstrap(document, ['app']);

$(document).ready(function() {
	//Initialize foundation
	$(document).foundation();
});

export default app;
