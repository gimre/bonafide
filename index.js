'use strict';

var Validator = require( './validator' );

var bonafide = function ( value ) {
    return new Validator( value );
};

console.log( bonafide( 2.1 ).isNumber( ).isInt( ) );

exports = module.exports;