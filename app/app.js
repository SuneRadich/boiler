import angular from 'angular';

import $ from 'jquery'

//Import foundation styling
import '../styles/foundation.scss';
import '../styles/styles.scss';

//Import foundation javascript logic
import "./foundation";

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
