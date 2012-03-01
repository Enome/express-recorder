var next = require('./next');
var response = require('./response');
var request = require ('./request');
var result = require('./result');

module.exports = function(middleware, state, callback){


  var end = function(){
    callback( result( req, res, nex ) )
  };

  var req = request(state);
  var res = response(state, end);
  var nex = next(end, end);

  middleware(req, res, nex);

};
