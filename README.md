# bonafide
Validation library for Node.js / browser
##install
```
npm install bonafide

```
### usage exmple

```javascript
'use strict';

let bonafide = require( 'bonafide' ),
    _ = require( 'lodash' ),
    hotels = require( '' )

bonafide.addValidator( 'isHotelArray', 'not Hotel Array', ( x ) => {
    if ( !( x instanceof Array ) ) {
        return false;
    }
    return x.every( h => h.name && h.stars && h.city && h.location && h.startDate && h.endDate ); // jshint ignore:line
} );

```
