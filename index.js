'use strict';

var Validator = require( './validator' ),
    bonafide = function ( value ) {
        return new Validator( value );
    };

bonafide.addValidator = function ( name, error, func ) {
    Validator.prototype[ name ] = function ( ) {
        if ( this.continue ) {
            let args = new Array( arguments.length + 1 ),
                   i = 0;
                   
            args[ i ] = this.value;
            
            while ( i < arguments.length ) {
                args[ i + 1 ] = arguments[ i ];
                i ++;
            }
            
            if ( !func.apply( this, args ) ) {
                this.error = Validator.stringFormat( error, args );
                this.continue = false;
            }
        }
        return this;
    }
};

exports = module.exports = bonafide;