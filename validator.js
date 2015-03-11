'use strict';

var Validator = function ( value ) {
    this.value = value;
    this.state = true;
};

var validators = {
    isInt:    function ( x ) { return x === ( x | 0 ); },
    isNumber: function ( x ) { return !isNaN( x ); }
};

Object.keys( validators ).forEach( function ( k ) {
    Validator.prototype[ k ] = function ( ) {
        if ( this.state ) {
            this.state = this.state && validators[ k ]( this.value );
        }
        return this;
    }
} );

Validator.prototype.valueOf = function ( ) {
    return this.state;
};

Validator.prototype.toString = function ( ) {
    return this.state;
};

Validator.prototype.inspect = Validator.prototype.toString;

exports = module.exports = Validator;