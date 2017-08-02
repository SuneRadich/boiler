import './app';

describe('app.controller', function() {

	var ctrl, calcService, $scope;

	beforeEach(function() {

		angular.mock.module('app');

		inject(function(_$controller_, _Calculator_, _$rootScope_){
			//Make the injected service available to the test
			calcService = _Calculator_;
			$scope = _$rootScope_.$new();

			//Spy on the add method
			spyOn(_Calculator_, 'add').and.callThrough();

			//Initialize the controller
			ctrl = _$controller_('appController', {
				Calculator: _Calculator_
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
