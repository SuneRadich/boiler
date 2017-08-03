function Calculator() {

	let methods = {};

	methods.add = function(x, y){
		return x + y;
	}

	methods.multiply = function(x, y) {
		return x * y;
	}

	return methods;

};

function foo() {
    console.log('MEFFE: I am never used!')
};

export const Foo = foo;

export const Calc = Calculator;
