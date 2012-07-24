# Express Recorder

This module will pass fakes to your middleware which you can assert.

## Example

```js
var recorder = require('express-recorder');

// Middleware 

var middleware = function (req, res, next) {
  res.locals.username = req.body.firstname + ' ' + res.locals.lastname;
  next();
};

// Setup state

var body = { firstname: 'Geert' };
var locals = { lastname: 'Pasteels' }; 

recorder(middleware, { body: body, locals: locals }, function (result) {

  result.eql({
    next: true,
    locals: { lastname: 'Pasteels', username: 'Geert Pasteels' }
  });

});

```

## State options

- body
- locals
- session
- params
- query
- cookies
- headers
- request

The 'request' option is used to add properties to the request object.

```js

recorder(middleware, { request: { missing: 'MIA' } }, function (result) {
  //assert
});

```

## Result object

The result object has the following properties for asserting.

- render
- redirect
- send
- json
- next
- header
- cookie
- locals

It also has a handy eql method that shows the difference between the result object and your expected object.

## Tests

```sh
make test
```
