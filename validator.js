'use strict';

var Validator = function ( value ) {
    this.value = value;
    this.error = undefined;
};

Validator.addValidator = function ( name, error, func ) {
    Validator.prototype[ name ] = function ( ) {
        if ( !this.error ) {
			let args = Array.prototype.concat.apply( [ this.value ], arguments );
			
            if ( !func.apply( this, args ) ) {
                this.error = error;
            }
        }
        return this;
    }
};

var validators = {
	isUndefined: {
		func: function ( x ) { return x === undefined; },
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
		func: function ( x ) { return String( x ) === String( {} ) },
		error: 'not object'
	},
	isJSON: {
		func: function ( x ) { try { JSON.parse( x ); } catch ( ex ) { return false; } return true; },
		error: 'notJSON'
	},
	isInt: {
		func: function ( x ) { return x === ( x | 0 ); },
		error: 'not integer'
	},
	isFloat: {
		func: function ( x ) { return x !== +x && ( x | 0 ); },
		error: 'not float'
	},
	isEmptyString: {
		func: function ( x ) { return x === ''; },
		error: 'not empty string'
	},
	isEmptyArray: {
		func: function ( x ) { return String( x ) === String( [ ] ) },
		error: 'not empty array'
	},
	isEmptyObject: {
		func: function ( x ) { if ( x !== null ) { return Object.keys( x ).length === 0; } return false; },
		error: 'not empty object'
	},
	isLowerString: {
		func: function ( x ) { return x === x.toString( ).toLowerCase( ); },
		error: 'not lower string'
	},
	isUpperString: {
		func: function ( x ) { return x === x.toString( ).toUpperCase( ); },
		error: 'not upper string'
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
	equ: {
		func: function ( x, y ) { return x === y; },
		error: 'not equal'
	}
};

Object.keys( validators ).forEach( function ( k ) {
    var validator = validators[ k ];
    Validator.addValidator( k, validator.error, validator.func );
} );

exports = module.exports = Validator;