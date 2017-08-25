import './app';

describe('app.controller', function() {

	var ctrl, $scope;

	beforeEach(function() {

		angular.mock.module('app');

		inject(function(_$controller_, _rootScope_){

			$scope = _$rootScope_.$new();

			//Initialize the controller
			ctrl = _$controller_('appController', {

			});

		})
	});

	it('should set title', function() {
		expect(ctrl.title).toBe('Default demo controller');
	});

	it('should set result', function() {
		expect(calcService.add).toHaveBeenCalledWith(2, 2);
		expect(ctrl.result).toBe(4);
	});

});
