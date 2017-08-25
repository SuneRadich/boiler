import modernizr from 'modernizr';
import angular from 'angular';
import $ from 'jquery';

import 'vendor/foundation/foundation.scss';

//Import foundation javascript
import "vendor/foundation/foundation";

import './app.scss';

import './components/components';
import controller from './app.controller';

var app = angular.module('app', ['components']);

app
	.controller('appController', controller);


angular.bootstrap(document, ['app']);

$(document).ready(function() {
	//Initialize foundation
	$(document).foundation();
});

export default app;
