'use strict';

var Validator = function ( value ) {
    this.value = value;
    this.error = undefined;
};

Validator.addValidator = function ( name, error, func ) {
    Validator.prototype[ name ] = function ( ) {
        if ( !this.error ) {
            if ( !func( this.value ) ) {
                this.error = error;
            }
        }
        return this;
    }
};

var validators = {
    isInt:    {
        func: function ( x ) { return x === ( x | 0 ); },
        error: 'not an integer'
    },
    isNumber: {
        func: function ( x ) { return !isNaN( x ); },
        error: 'not a number'
    }
};

Object.keys( validators ).forEach( function ( k ) {
    var validator = validators[ k ];
    Validator.addValidator( k, validator.error, validator.func );
} );

exports = module.exports = Validator;