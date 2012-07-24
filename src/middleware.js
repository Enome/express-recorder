var next = require('./next');
var response = require('./response');
var request = require ('./request');
var result = require('./result');

module.exports = function (middleware, state, callback) {

  if (arguments.length === 2) {
    callback = state;
  }

  var req, res, nex;

  var end = function () {
    callback(result(req, res, nex));
  };

  req = request(state);
  res = response(state, end);
  nex = next(end);

  middleware(req, res, nex);

};
