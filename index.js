'use strict';

var Validator = require( './validator' );

var bonafide = function ( value ) {
    return new Validator( value );
};

Validator.addValidator( 'isString', 'not a string', function ( x ) {
    return typeof x === 'string';
} );

var res = bonafide( 3 ).in( [3, 4] ).gt( 5 );

if ( res.error ) {
    console.log( res.error );
}

exports = module.exports;