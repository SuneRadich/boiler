var controller = function($q, Calculator) {

	'ngInject';

	this.title = "Default demo controller";
	this.description = "Showing a page with a Kitchen Sink of all foundation modules";

	this.result = Calculator.add(2, 2);
}

export default controller;
