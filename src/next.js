var _ = require('underscore');

module.exports = function( walk, end ){

  var result = {};

  var next = function(err){

    if( _.isUndefined(result.next) ){
      result.next = [];
    };

    if(_.isUndefined(err)){
      result.next.push(true);
      !_.isUndefined(walk) && walk();
    } else {
      result.next.push(err.message);
      !_.isUndefined(end) && end();
    };

  };

  next.end = function(){ return result; };

  return next;

};
