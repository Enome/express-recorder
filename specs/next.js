var next = require('../src/next');

describe('Next', function () {

  describe('Happy path', function () {

    it('returns true when next is called', function () {
      var n = next();
      n();
      n.end().next.should.eql(true);
    });

    it('calls the callback', function () {
      var called = false;
      var callback = function () {
        called = true;
      };

      next(callback)();
      called.should.be.true;
    });

  });

  describe('Sad path', function () {

    it('creates a next array and adds 404', function () {
      var n = next();
      n(404);
      n.end().next.should.eql(404);
    });

  });

});
