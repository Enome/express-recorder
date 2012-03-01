var request = require('../src/request');

describe('Request', function(){

  describe('Body', function(){

    it('Adds body to request object', function(){

      var req = request( { body: { user: 'Geert' } } );
      req.body.should.eql( { user: 'Geert' } );

    });

  });

  describe('Param', function(){

    it('Adds param to the request object', function(){

      var req = request( { params: { username: 'Geert' } } );
      req.param('username').should.eql('Geert');

    });

  });

  describe('Session', function(){

    it('sets the session user', function(){

      var req = request( { session: { user: 'Geert' } });
      req.end().session.should.eql( { user: 'Geert' });

    });

    it('returns the predefined session on end', function(){

      var req = request( { session: { user: 'Geert' } });
      req.end().should.eql( { session: { user: 'Geert' } });

    });

    it('returns set session vars', function(){

      var req = request();
      req.session.user = 'Geert';
      req.end().should.eql( { session: { user: 'Geert' } });

    });

    it('returns set session vars', function(){

      var req = request();
      req.end().should.eql( { } );

    });

    it('destroys the users variable', function(){

      var req = request( { session: { user: 'Geert', password: 1234 } });
      req.session.destroy('user');
      req.end().should.eql( { session: { password: 1234 } });

    });

  });

});
