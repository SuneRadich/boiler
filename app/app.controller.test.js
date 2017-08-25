import './app';

describe('app.controller', function() {

	var ctrl;

	beforeEach(function() {

		angular.mock.module('app');

		inject(function(_$controller_) {

			//Initialize the controller
			ctrl = _$controller_('appController', {

			});

		})
	});

	it('should set title', function() {
		expect(ctrl.title).toBe('Default demo controller');
	});

});
