'use strict';

var Validator = require( './validator' );

var bonafide = function ( value ) {
    return new Validator( value );
};

Validator.addValidator( 'isString', 'not a string', function ( x ) {
    return typeof x === 'string';
} );

var res = bonafide( {} ).isInt( );
if ( res.error ) {
    console.log( res.error );
}

exports = module.exports;