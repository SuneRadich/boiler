import $ from 'jquery'

import '../styles/foundation.scss';

import "./test/dummy";
import "./foundation";


const core = () => {

    console.log('I am core')

};

$(document).ready(function() {

	$(document).foundation();

});


export default core;
