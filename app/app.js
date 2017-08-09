import modernizr from 'modernizr';
import angular from 'angular';
import $ from 'jquery';

import 'vendor/foundation/foundation.scss';

//Import foundation javascript
import "vendor/foundation/foundation";

import './app.scss';

import controller from './app.controller';
import { Calc } from './services/calculate.service';

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
