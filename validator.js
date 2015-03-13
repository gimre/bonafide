'use strict';

var Validator = function ( value ) {
    this.value = value;
    this.error = undefined;
    this.continue = true;
};

Validator.stringFormat = function( s, f ) {
    return s.replace( /{(\d+)}/g, function( match, number ) { 
        return typeof f[ number ] != 'undefined' ? JSON.stringify( f[ number ] ) : '';
    });
}

Validator.addValidator = function ( name, error, func ) {
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

var validators = {
    optional: {
        func: function ( x ) {
            if ( !x ) {
                this.continue = false;
            }
            return true;
        }
    },
    isUndefined: {
        func: function ( x ) { return x == undefined; },
        error: '{0} is not undefined'
    },
    isNull: {
        func: function ( x ) { return x === null; },
        error: '{0} is not null'
    },
    isBoolean: {
        func: function ( x ) { return x === !!x; },
        error: '{0} is not boolean'
    },
    isNumber: {
        func: function ( x ) { return !isNaN( x ); },
        error: '{0} is not number'
    },
    isString: {
        func: function ( x ) { return String( x ) === x; },
        error: '{0} is not string'
    },
    isArray: {
        func: function ( x ) { return Array.isArray( x ); },
        error: '{0} is not array'
    },
    isObject: {
        func: function ( x ) { return String( x ) === String( { } ); },
        error: '{0} is not object'
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
        error: '{0} is not JSON'
    },
    isInt: {
        func: function ( x ) { return x == ( x | 0 ); },
        error: '{0} is not integer'
    },
    isFloat: {
        func: function ( x ) { return ( +x && ( x | 0 ) ); },
        error: '{0} is not float'
    },
    isNumeric: {
        func: function ( x ) { return /^\d+$/.test( x ); },
        error: '{0} is not numeric'
    },
    isAlpha: {
        func: function ( x ) { return /^[A-z]+$/.test( x ); },
        error: '{0} is not alpha'
    },
    isAlphanumeric: {
        func: function ( x ) { return /^\w+$/.test( x ); },
        error: '{0} is not alphanumeric'
    },
    isEmptyString: {
        func: function ( x ) { return x === ''; },
        error: '{0} is not empty string'
    },
    isEmptyArray: {
        func: function ( x ) { return JSON.stringify( x ) === JSON.stringify( [ ] ); },
        error: '{0} is not empty array'
    },
    isEmptyObject: {
        func: function ( x ) { return JSON.stringify( x ) === JSON.stringify( { } ) },
        error: '{0} is not empty object'
    },
    isLowerString: {
        func: function ( x ) { return x === String( x ).toLowerCase( ); },
        error: '{0} is not lower string'
    },
    isUpperString: {
        func: function ( x ) { return x === String( x ).toUpperCase( ); },
        error: '{0} is not upper string'
    },
    inString: {
        func: function ( x, y ) {
            if ( String( y ) === y ) {
                return y.indexOf( x ) !== -1;
            }
            
            return false;
        },
        error: '{0} is not in string {1}'
    },
    inArray: {
        func: function ( x, y ) {
            if ( Array.isArray( y ) ) {
                return y.indexOf( x ) !== -1;
            }
            
            return false;
        },
        error: '{0} is not in array {1}'
    },
    inObject: {
        func: function ( x, y ) {
            return Object( y )[ x ] !== undefined;
        },
        error: '{0} is not in object {1}'
    },
    notEmpty: {
        func: function ( x ) {
            if ( Number( x ) === x ) {
                x = String( x );
            }
            
            if ( Array.isArray( x ) || String( x ) === x ) {
                return x.length > 0;
            }
            
            return false;
        },
        error: '{0} is empty'
    },
    has: {
        func: function ( x, y ) {
            return JSON.stringify( x ).indexOf( JSON.stringify( y ) ) !== -1;
        },
        error: '{0} has not {1}'
    },
    match: {
        func: function ( x, y ) {
            return new RegExp( y ).exec( x ) !== null;
        },
        error: '{0} not match {1}'
    },
    len: {
        func: function ( x, y, z ) {
            if ( Number( x ) === x ) {
                x = String( x );
            }
            
            if ( Array.isArray( x ) || String( x ) === x ) {
                z = z || x.length;
                return x.length >= y && x.length <= z;
            }
            
            return false;
        },
        error: '{0} is not in length [{1} .. {2}]'
    },
    gt: {
        func: function ( x, y ) { return x > y; },
        error: '{0} is not greater than {1}'
    },
    gte: {
        func: function ( x, y ) { return x >= y; },
        error: '{0} is not greater or equal to {1}'
    },
    lt: {
        func: function ( x, y ) { return x < y; },
        error: '{0} is not lower than {1}'
    },
    lte: {
        func: function ( x, y ) { return x <= y; },
        error: '{0} is not lower or equal to {1}'
    },
    eq: {
        func: function ( x, y ) { return x === y; },
        error: '{0} is not equal to {1}'
    }
};

Object.keys( validators ).forEach( function ( k ) {
    var validator = validators[ k ];
    Validator.addValidator( k, validator.error, validator.func );
} );

exports = module.exports = Validator;
