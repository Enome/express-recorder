var _ = require('underscore');

module.exports = function(state) {

  var request = {

    session: {},

    end: function(){

      var result = {};

      if( !_.isEmpty(request.session) ){ 
        result.session =  request.session;
      };

      return result;

    }
  
  };

  if( !_.isUndefined(state) ){

    if( !_.isUndefined(state.body) ){

      request.body = state.body;

    };

    if( !_.isUndefined(state.session) ){

      request.session = state.session;

    };

  };

  return request;

};
