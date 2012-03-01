var request = require('../src/request');

describe('Request', function(){

  it('Adds body to request object', function(){

    var req = request( { body: { user: 'Geert' } } );
    req.body.should.eql( { user: 'Geert' } );

  });

  it('sets the session user', function(){

    var req = request( { session: { user: 'Geert' } });
    req.session.should.eql( { user: 'Geert' });

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

});
