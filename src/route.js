var _ = require('underscore');
var app = require('./app')();
var next = require('./next');
var response = require('./response');
var request = require ('./request');
var result = require('./result');

var walk = function(middlewares, req, res, nex){

  middlewares.shift()(req, res, nex);

};

var replay = function(type, url, state, callback){

  if(arguments.length === 3){
    callback = state;
    state = {};
  };

  var middlewares = _.clone(app.routes[type][url]);

  var end = function(){
    callback( result( req, res, nex ) )
  };

  var req = request(state);
  var res = response(state, end);
  var nex = next(function(){

    walk(middlewares, req, res, nex);
    
  }, end);

  walk(middlewares, req, res, nex);

};

module.exports = {
 
  record: function(){

    return app;

  },

  replay: {

    get: replay.bind(null, 'get'),
    post: replay.bind(null, 'post'),
    put: replay.bind(null, 'put'),
    delete: replay.bind(null, 'delete')

  }

};
