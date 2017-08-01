import calcService from '.calculate.service';

describe('calculate.service', () => {

	describe('add', () => {

		it('should add numbers', () => {
			let result = calcService.add(2, 2);

			expect(result).toBe(5);

		});
	});

});
