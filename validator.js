'use strict';

var Validator = function ( value ) {
    this.value = value;
    this.error = undefined;
};

Validator.addValidator = function ( name, error, func ) {
    Validator.prototype[ name ] = function ( ) {
        if ( !this.error ) {
            let args = new Array( arguments.length + 1 ),
                   i = 0;
                   
            args[ i ] = this.value;
            
            while ( i < arguments.length ) {
                args[ i + 1 ] = arguments[ i ];
                i ++;
            }
            
            if ( !func.apply( this, args ) ) {
                this.error = error;
            }
        }
        return this;
    }
};

var validators = {
    isUndefined: {
        func: function ( x ) { return x == undefined; },
        error: 'not undefined'
    },
    isNull: {
        func: function ( x ) { return x === null; },
        error: 'not null'
    },
    isBoolean: {
        func: function ( x ) { return x === !!x; },
        error: 'not boolean'
    },
    isNumber: {
        func: function ( x ) { return !isNaN( x ); },
        error: 'not number'
    },
    isString: {
        func: function ( x ) { return String( x ) === x; },
        error: 'not string'
    },
    isArray: {
        func: function ( x ) { return Array.isArray( x ); },
        error: 'not array'
    },
    isObject: {
        func: function ( x ) { return String( x ) === String( { } ); },
        error: 'not object'
    },
    isJSON: {
        func: function ( x ) {
            try {
                JSON.parse( x );
            }
            catch ( ex ) {
                return false;
            }
            return true;
        },
        error: 'not JSON'
    },
    isInt: {
        func: function ( x ) { return x == ( x | 0 ); },
        error: 'not integer'
    },
    isFloat: {
        func: function ( x ) { return ( +x && ( x | 0 ) ); },
        error: 'not float'
    },
    isNumeric: {
        func: function ( x ) { return /^\d+$/.test( x ); },
        error: 'not numeric'
    },
    isAlpha: {
        func: function ( x ) { return /^[A-z]+$/.test( x ); },
        error: 'not alpha'
    },
    isAlphanumeric: {
        func: function ( x ) { return /^\w+$/.test( x ); },
        error: 'not alphanumeric'
    },
    isEmptyString: {
        func: function ( x ) { return x === ''; },
        error: 'not empty string'
    },
    isEmptyArray: {
        func: function ( x ) { return String( x ) === String( [ ] ); },
        error: 'not empty array'
    },
    isEmptyObject: {
        func: function ( x ) {
            if ( x !== null ) {
                return Object.keys( x ).length === 0;
            }
            return false;
        },
        error: 'not empty object'
    },
    isLowerString: {
        func: function ( x ) { return x === String( x ).toLowerCase( ); },
        error: 'not lower string'
    },
    isUpperString: {
        func: function ( x ) { return x === String( x ).toUpperCase( ); },
        error: 'not upper string'
    },
    len: {
        func: function ( x, y, z ) {
            let not_string = String( x ) !== x;
            let not_array = !Array.isArray( x );
            
            if ( not_string && not_array )
                return false;
            
            z = z || x.length;
            
            return x.length >= y && x.length <= z;
        },
        error: 'not in length'
    },
    in: {
        func: function ( x, y ) {
            return JSON.stringify( y ).indexOf( JSON.stringify( x ) ) !== -1;
        },
        error: 'not in'
    },
    gt: {
        func: function ( x, y ) { return x > y; },
        error: 'not greater'
    },
    gte: {
        func: function ( x, y ) { return x >= y; },
        error: 'not greater or equal'
    },
    lt: {
        func: function ( x, y ) { return x < y; },
        error: 'not lower'
    },
    lte: {
        func: function ( x, y ) { return x <= y; },
        error: 'not lower or equal'
    },
    eq: {
        func: function ( x, y ) { return x === y; },
        error: 'not equal'
    }
};

Object.keys( validators ).forEach( function ( k ) {
    var validator = validators[ k ];
    Validator.addValidator( k, validator.error, validator.func );
} );

exports = module.exports = Validator;