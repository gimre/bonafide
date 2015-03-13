'use strict';

var Validator = require( './validator' );

exports = module.exports = function ( value ) {
    return new Validator( value );
};