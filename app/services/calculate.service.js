function Calc() {

	let methods = {};

	methods.add = function(x, y){
		console.log('I am called!', arguments)
		return x + y;
	}

	methods.multiply = function(x, y) {
		return x * y;
	}

	return methods;

}

export default Calc;
