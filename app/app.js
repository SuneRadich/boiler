import angular from 'angular';

import $ from 'jquery'

//Import foundation styling
import '../styles/foundation.scss';
import '../styles/styles.scss';

//Import foundation javascript logic
import "./foundation";

import controller from './app.controller';


var app = angular.module('app', []);

app.controller('appController', controller);

angular.bootstrap(document, ['app']);

$(document).ready(function() {
	//Initialize foundation
	$(document).foundation();
});

export default app;
