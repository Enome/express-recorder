var recorder = require('../src/middleware').recorder;

describe('Middleware', function(){

  describe('Example One', function(){

    var middleware = function(req, res, next){

      res.local('username', req.body.firstname + ' ' + res.locals().lastname);

      next()

    };

    it('sets locals and nexts', function(done){

      recorder(middleware, { body: { firstname: 'Geert' }, locals: { lastname: 'Pasteels' } }, function(result){

        result.data.should.eql({ 
          next: [ true ] ,
          locals: { 
            lastname: 'Pasteels',
            username: 'Geert Pasteels'
          }
        });

        done()
              
      });

    });

  });

  describe('Example two', function(){

    var middleware = function(req, res, next){

      setTimeout( function(){ res.redirect('/login') }, 10 );

    };

    it('sets redirect url', function(done){

      recorder(middleware, {}, function(result){

        result.eql({ redirect:'/login' });

        done();

      });

    });

  });

});
