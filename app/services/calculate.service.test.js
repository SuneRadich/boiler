import { Calc } from './calculate.service';

describe('calculate.service', () => {

	describe('add', () => {

		it('should add numbers', () => {
			let result = Calc().add(2, 2);

			expect(result).toBe(4);

		});
	});

});
