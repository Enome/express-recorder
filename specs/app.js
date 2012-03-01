var app = require('../src/app');
var util = require('util');


describe('Application', function(){

  var a;

  var mw1 = function(){};
  var mw2 = function(){};
  var mw3 = function(){};
  var mw4 = function(){};

  beforeEach( function(){

    a = app();

  });

  it('sets get', function(){

    a.get( '/get', mw1, mw2, mw3, mw4 );

    a.routes.get['/get'].should.eql([ mw1, mw2, mw3, mw4 ] );

  });

  it('sets post', function(){

    a.post( '/post', mw2, mw4 );

    a.routes.post['/post'].should.eql([ mw2, mw4 ] );

  });

  it('sets put', function(){

    a.post( '/put', mw2 );

    a.routes.post['/put'].should.eql([ mw2 ] );

  });

  it('sets delete', function(){

    a.post( '/delete', mw2, mw1 );

    a.routes.post['/delete'].should.eql([ mw2, mw1 ] );

  });

});
