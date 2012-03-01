var compare = require('../src/equal').compare;
var eql = require('../src/equal').eql;

describe('compare', function(){

  it('returns a diff string', function(){

    var user = { username: 'Geert' };
    var evilTwin = { usrname: 'Gert' };

    compare( user, evilTwin ).should.eql('{\u001b[32m\u001b[1m\n  "usrname" : "Gert"\u001b[0m,\n  \u001b[31m\u001b[1m"username" : "Geert"\u001b[0m\n}');

  });

});

describe('eql', function(){

  it('throws a error with the compare string, result and expected', function(){

    var user = { username: 'Geert' };
    var evilTwin = { usrname: 'Gert' };

    ( function() { eql( user, evilTwin ); } ).should.throw('\n\u001b[0m\n\nResult:   {\"usrname\":\"Gert\"}\nExpected: {\"username\":\"Geert\"}\nDiff: \n{\u001b[32m\u001b[1m\n  \"usrname\" : \"Gert\"\u001b[0m,\n  \u001b[31m\u001b[1m\"username\" : \"Geert\"\u001b[0m\n}');

  });

});
