var next = require('../src/next');

describe('Next', function(){


  describe('Happy path', function(){

    it('creates a next array and add true', function(){

      var nex = next()
      nex()
      nex.end().next.should.eql( [true] );

    });

    it('calls the callback', function(){

      var called = false;
      var callback = function(){
        called = true;
      };

      next( callback )();
      called.should.be.true;

    });

    it('appends to the results next array', function(){

      var nex = next();
      nex();
      nex();
      nex.end().next.should.eql( [true, true] );

    });

  });

  describe('Sad path', function(){

    it('creates a next array and adds 404', function(){

      var nex = next();
      nex( new Error(404) );
      nex.end().next.should.eql( [ '404' ] );

    });

  });

});
