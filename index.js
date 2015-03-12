'use strict';

var Validator = require( './validator' );

var bonafide = function ( value ) {
    return new Validator( value );
};

Validator.addValidator( 'isString', 'not a string', function ( x ) {
    return typeof x === 'string';
} );

var res = bonafide( 3 ).gt( 2 ).lt( 4 ).gte( 1 ).lte( 3 ).equ( 3 );

if ( res.error ) {
    console.log( res.error );
}

exports = module.exports;