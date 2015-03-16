'use strict';

var Validator = require( './validator' ),
    bonafide = function ( value ) {
        return new Validator( value );
    };

bonafide.addValidator = Validator.addValidator;

exports = module.exports = bonafide;