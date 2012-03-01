var recorder = require('../src/route').recorder;


describe('Route Recorder', function(){


  describe('Example One', function(){

    var middleware1 = function(req, res, next){

      res.local('username', req.body.firstname + ' ' + res.locals().lastname);

      next()

    };

    var middleware2 = function(req, res, next){

      if(res.locals().username === 'Geert Pasteels'){

        next()

      } else {

        next( new Error(404) );

      }

    };

    var middleware3 = function(req, res, next){

      setTimeout( function(){ res.render('users/new'); }, 10 );

    };

    var route = function(app){

      app.get('/login', middleware1, middleware2, middleware3);

    };

    beforeEach(function(){

      route( recorder.record() )

    });

    it('does two nexts, renders users/new and sets the local user geert', function(done){

      var state = { body: { firstname: 'Geert' }, locals: { lastname:'Pasteels' } };

      recorder.replay.get('/login', state, function(result){

        result.data.should.eql({
          next: [true, true],
          render: 'users/new',
          locals: { username: 'Geert Pasteels', lastname: 'Pasteels' }
        });         

        done();
                 
      });

    });

    it('does two nexts, renders users/new and sets the local user geert', function(done){

      var state = { body: { firstname: 'Jimi' }, locals: { lastname: 'James' } };

      recorder.replay.get('/login', state, function(result){

        result.data.should.eql({
          next: [true, '404'],
          locals: { username: 'Jimi James', lastname: 'James' }
        });         

        done();
                 
      });

    });

  });


  describe('Example Two', function(){

    var middleware1 = function(req, res, next){

      req.session.user = req.session.firstname + ' ' + req.session.lastname 

      next()

    };

    var middleware2 = function(req, res, next){

      if( req.session.user === 'Geert Pasteels' ){

        next()

      } else {

        res.send('Hello? Yes, this is dog.');

      };

    };

    var middleware3 = function(req, res, next){

      res.redirect('/users');

    };

    var route = function(app){

      app.post('/users/new', middleware1, middleware2, middleware3);

    };

    beforeEach(function(){

      route( recorder.record() )

    });

    it('next twice, session and redirect to users', function(done){

      var state = { session: { firstname: 'Geert', lastname: 'Pasteels' } };

      recorder.replay.post('/users/new', state, function(result){

        result.data.should.eql({ 
          next: [ true, true ],
          session: {
            firstname: 'Geert',
            lastname: 'Pasteels',
            user: 'Geert Pasteels'
          },
          redirect: '/users'
        });         

        done();
                 
      });

    });

    it('next twice, session and send', function(done){

      var state = { session: { firstname: 'Jim', lastname: 'James' } };

      recorder.replay.post('/users/new', state, function(result){

        result.data.should.eql({ 
          next: [ true ],
          session: {
            firstname: 'Jim',
            lastname: 'James',
            user: 'Jim James'
          },
          send: 'Hello? Yes, this is dog.'
        });         

        done();
                 
      });

    });

    it('use built-in eql', function(done){

      var state = { session: { firstname: 'Jim', lastname: 'James' } };

      recorder.replay.post('/users/new', state, function(result){

        result.eql({
          next: [ true ],
          session: {
            firstname: 'Jim',
            lastname: 'James',
            user: 'Jim James'
          },
          send: 'Hello? Yes, this is dog.'
        });         

        done();
                 
      });

    });

  });

});
