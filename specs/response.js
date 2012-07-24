var response = require('../src/response');

describe('Response', function () {

  describe('Locals', function () {

    it('sets the locals', function () {
      var res = response();
      res.locals.user = 'Geert';
      res.end().locals.should.eql({ user: 'Geert' });
    });


    it('gets the predefined locals', function () {
      var resp = response({ locals: { user: 'Geert' } });
      resp.locals.should.eql({ user: 'Geert' });
    });


    it('gets the predefined local and sets a new one', function () {
      var resp = response({ locals: { user: 'Geert' } });
      resp.locals.password = 1234;
      resp.locals.should.eql({ user: 'Geert', password: 1234 });
    });

    it('returns locals on end', function () {
      var resp = response({ locals: { user: 'Geert' } });
      resp.locals.password = 1234;
      resp.end().locals.should.eql({ user: 'Geert', password: 1234 });
    });


  });


  describe('Render', function () {

    it('appends users/new to render', function () {
      var resp = response();
      resp.render('users/new');
      resp.end().render.should.eql('users/new');
    });

    it('sets the locals', function () {
      var resp = response();
      resp.render('users/new', { user: { username: 'Geert' } });
      resp.end().locals.should.eql({ user: { username: 'Geert' } });
    });

    it('calls the callback when set', function () {
      var called = false;
      var resp = response({}, function () { called = true; });
      resp.render('users/new');
      called.should.be.true;
    });

  });


  describe('Redirect', function () {
    
    it('sets redirect', function () {
      var resp = response();
      resp.redirect('/users');
      resp.end().should.eql({ redirect: '/users' });
    });

    it('calls the callback when set', function () {
      var called = false;
      var resp = response({}, function () { called = true; });
      resp.redirect('/users');
      called.should.be.true;
    });

  });


  describe('Send', function () {

    it('sets send', function () {
      var resp = response();
      resp.send('Send me to the moon');
      resp.end().should.eql({ send: 'Send me to the moon' });
    });

    it('calls the callback when set', function () {
      var called = false;
      var resp = response({}, function () { called = true; });
      resp.send('Send me to the moon');
      called.should.be.true;
    });

  });


  describe('Header', function () {

    it('sets header', function () {
      var resp = response();
      resp.header('Content-Type', 'application/json');
      resp.end().should.eql({ headers: { 'Content-Type': 'application/json' } });
    });

  });


  describe('Cookie', function () {

    it('sets a cookie', function () {
      var resp = response();
      resp.cookie('fruit', 'banana');
      resp.end().should.eql({ cookies: { fruit: 'banana' } });
    });

  });

  describe('Json', function () {

    it('sets json', function () {
      var resp = response();
      resp.json({ fruit: 'banana' });
      resp.end().should.eql({ json: { fruit: 'banana' } });
    });

    it('calls the callback when set', function () {
      var called = false;
      var resp = response({}, function () { called = true; });
      resp.send('Send me to the moon');
      called.should.be.true;
    });

  });

});
