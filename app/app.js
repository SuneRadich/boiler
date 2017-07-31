import $ from 'jquery'

import '../styles/foundation.scss';

import "./test/dummy";
import "./foundation";

//import 'script-loader!jquery'
//import 'script-loader!what-input'
//import 'script-loader!foundation-sites/js/entries/foundation'


const core = () => {

    console.log('I am core')

};

$(document).ready(function() {
    $(document).foundation()
});


export default core;
