function Calc() {

	let methods = {};

	methods.add = function(x, y){
		return x + y;
	}

	methods.multiply = function(x, y) {
		return x * y;
	}

	return methods;

}

export default Calc;
