var _ = require('underscore');

module.exports = function(state) {

  var request = {

    session: {

      destroy: function(key){

        delete this[key];

      }
    
    },

    end: function(){

      var result = {};

      delete request.session['destroy'];

      if( !_.isEmpty(request.session) ){ 
        result.session =  request.session;
      };

      return result;

    },

    param: function(key){

      return state.params[key];

    }
  
  };

  if( !_.isUndefined(state) ){

    if( !_.isUndefined(state.body) ){

      request.body = state.body;

    };

    if( !_.isUndefined(state.session) ){

      _.extend( request.session, state.session );

    };

    if( !_.isUndefined(state.query) ){

      request.query = state.query;

    };

    if( !_.isUndefined(state.request) ){

      _.extend( request, state.request );

    };

  };

  return request;

};
