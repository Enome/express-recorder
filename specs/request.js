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

    it('Adds an empty param object', function(){

      var req = request( { params: {} } );
      req.params.should.eql( {} );

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

  describe('Query', function(){

    it('sets the query q to "search term"', function(){

      var req = request( { query: { q: 'search term' } } );
      req.query.q.should.eql('search term');

    });

  });

  describe('Cookies', function(){

    it('sets the cookie fruit to "banana"', function(){

      var req = request( { cookies: { fruit: 'banana' } } );
      req.cookies.fruit.should.eql('banana');

    });

  });

  describe('Uncommon properties', function(){

    it('sets the header user', function(){

      var req = request( { request: { headers: { user: 'Geert' } } } );
      req.headers.user.should.eql('Geert');

    });

    it('sets the route method to post', function(){

      var req = request( { request: { route: { method: 'post' } } } );
      req.route.method.should.eql('post');

    });

  });

});
