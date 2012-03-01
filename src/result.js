var eql = require('./equal').eql;
var _ = require('underscore');

module.exports = function(req, res, nex){

  var data =  _.extend( {}, req.end(), res.end(), nex.end() );

  return {
    data: data,  
    eql: function(expected){
      eql(data, expected);
    }
  };

};
